import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface FormLead {
    name: string;
    email: string;
    timestamp: Time;
    phone: string;
}
export interface Order {
    id: bigint;
    packagePaid: boolean;
    packageType: PackageType;
    productPaid: boolean;
    notes: string;
    timestamp: Time;
    caller: Principal;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Lead {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ChatbotLead {
    name: string;
    email: string;
    timestamp: Time;
    phone: string;
    chatHistory?: Array<string>;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Product {
    id: string;
    packageType: PackageType;
    name: string;
    description: string;
    currency: string;
    priceInCents: bigint;
}
export enum PackageType {
    premium = "premium",
    custom = "custom",
    standard = "standard"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimFreeTrial(): Promise<boolean>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboard(): Promise<{
        forms: Array<FormLead>;
        freeTrialClaimed: boolean;
        orders: Array<Order>;
        leads: Array<Lead>;
        chatbotLeads: Array<ChatbotLead>;
    }>;
    getFileReference(fileId: string): Promise<ExternalBlob | null>;
    getProducts(): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveFileReference(fileId: string, blob: ExternalBlob): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitChatbotLead(name: string, email: string, phone: string, chatHistory: Array<string> | null): Promise<ChatbotLead>;
    submitFormLead(name: string, email: string, phone: string): Promise<FormLead>;
    submitLead(name: string, email: string, phone: string, message: string): Promise<Lead>;
    submitOrder(packageType: PackageType, notes: string, productPaid: boolean, packagePaid: boolean): Promise<Order>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
