import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization state initialization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  type Order = {
    id : Nat;
    caller : Principal;
    packageType : PackageType;
    notes : Text;
    timestamp : Time.Time;
    productPaid : Bool;
    packagePaid : Bool;
  };

  type PackageType = {
    #standard;
    #premium;
    #custom;
  };

  type Lead = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type FormLead = {
    name : Text;
    email : Text;
    phone : Text;
    timestamp : Time.Time;
  };

  type ChatbotLead = {
    name : Text;
    email : Text;
    phone : Text;
    timestamp : Time.Time;
    chatHistory : ?[Text];
  };

  type Product = {
    id : Text;
    name : Text;
    description : Text;
    packageType : PackageType;
    priceInCents : Nat;
    currency : Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  include MixinStorage();

  // State
  let userProfiles = Map.empty<Principal, UserProfile>();
  var orderIdCounter = 0;
  let orders = Map.empty<Nat, Order>();
  let leads = Map.empty<Principal, [Lead]>();
  let forms = Map.empty<Principal, [FormLead]>();
  let chatbotLeads = Map.empty<Principal, [ChatbotLead]>();
  let freeTrialClaimedStatus = Map.empty<Principal, Bool>();
  let products = Map.empty<Text, Product>();
  let fileReferences = Map.empty<Text, Storage.ExternalBlob>();
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Dashboard function
  public shared ({ caller }) func getDashboard() : async {
    freeTrialClaimed : Bool;
    orders : [Order];
    leads : [Lead];
    forms : [FormLead];
    chatbotLeads : [ChatbotLead];
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view dashboard");
    };

    let freeTrialClaimed = switch (freeTrialClaimedStatus.get(caller)) {
      case (?status) { status };
      case (null) { false };
    };

    let userOrders = orders.values().toArray().filter(
      func(o : Order) : Bool { o.caller == caller }
    );

    let userLeads = leads.get(caller);
    let userForms = forms.get(caller);
    let userChatbotLeads = chatbotLeads.get(caller);

    {
      freeTrialClaimed;
      orders = userOrders;
      leads = switch (userLeads) {
        case (null) { [] };
        case (?ls) { ls };
      };
      forms = switch (userForms) {
        case (null) { [] };
        case (?f) { f };
      };
      chatbotLeads = switch (userChatbotLeads) {
        case (null) { [] };
        case (?cl) { cl };
      };
    };
  };

  // Order submission (returns result for better error handling)
  public shared ({ caller }) func submitOrder(packageType : PackageType, notes : Text, productPaid : Bool, packagePaid : Bool) : async Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit orders");
    };

    orderIdCounter += 1;
    let order : Order = {
      id = orderIdCounter;
      caller;
      packageType;
      notes;
      timestamp = Time.now();
      productPaid;
      packagePaid;
    };

    orders.add(order.id, order);
    order;
  };

  // Free trial claim (returns result for better error handling)
  public shared ({ caller }) func claimFreeTrial() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can claim free trial");
    };
    if (switch (freeTrialClaimedStatus.get(caller)) { case (?status) { status }; case (null) { false } }) {
      Runtime.trap("Free trial already claimed");
    };

    freeTrialClaimedStatus.add(caller, true);
    true;
  };

  // Lead submission (returns result for better error handling)
  public shared ({ caller }) func submitLead(name : Text, email : Text, phone : Text, message : Text) : async Lead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit leads");
    };

    let newLead : Lead = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    let existingLeads = switch (leads.get(caller)) {
      case (null) { [] };
      case (?leads) { leads };
    };

    let updatedLeads = existingLeads.concat([newLead]);
    leads.add(caller, updatedLeads);
    newLead;
  };

  // Form lead submission (returns result for better error handling)
  public shared ({ caller }) func submitFormLead(name : Text, email : Text, phone : Text) : async FormLead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit form leads");
    };

    let newForm : FormLead = {
      name;
      email;
      phone;
      timestamp = Time.now();
    };

    let existingForms = switch (forms.get(caller)) {
      case (null) { [] };
      case (?forms) { forms };
    };

    let updatedForms = existingForms.concat([newForm]);
    forms.add(caller, updatedForms);
    newForm;
  };

  // Chatbot lead submission (returns result for better error handling)
  public shared ({ caller }) func submitChatbotLead(name : Text, email : Text, phone : Text, chatHistory : ?[Text]) : async ChatbotLead {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit chatbot leads");
    };

    let newChatbotLead : ChatbotLead = {
      name;
      email;
      phone;
      timestamp = Time.now();
      chatHistory;
    };

    let existingChatbotLeads = switch (chatbotLeads.get(caller)) {
      case (null) { [] };
      case (?leads) { leads };
    };

    let updatedChatbotLeads = existingChatbotLeads.concat([newChatbotLead]);
    chatbotLeads.add(caller, updatedChatbotLeads);
    newChatbotLead;
  };

  // Product management functions
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.id, product);
  };

  // Stripe Integration
  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // File/Blob operations (example: upload/store a reference)
  public shared ({ caller }) func saveFileReference(fileId : Text, blob : Storage.ExternalBlob) : async () {
    fileReferences.add(fileId, blob);
  };

  public query ({ caller }) func getFileReference(fileId : Text) : async ?Storage.ExternalBlob {
    fileReferences.get(fileId);
  };
};
