import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageMeta } from '../hooks/usePageMeta';
import { useGetDashboard, useGetCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import RequireAuth from '../components/auth/RequireAuth';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';
import { CheckCircle2, XCircle, Clock, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function DashboardContent() {
  const { data: dashboard, isLoading: dashboardLoading } = useGetDashboard();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { identity } = useInternetIdentity();

  const showProfileSetup = !!identity && !profileLoading && isFetched && userProfile === null;

  if (dashboardLoading || profileLoading) {
    return (
      <div className="container py-16">
        <p className="text-center text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <ProfileSetupModal open={showProfileSetup} />
      
      <div className="container py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          {userProfile && (
            <p className="text-muted-foreground">Welcome back, {userProfile.name}!</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Free Trial Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {dashboard?.freeTrialClaimed ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-semibold">Claimed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">Available</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dashboard?.orders.length || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leads Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {(dashboard?.forms.length || 0) + (dashboard?.chatbotLeads.length || 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>Track your project orders</CardDescription>
          </CardHeader>
          <CardContent>
            {!dashboard?.orders.length ? (
              <p className="text-muted-foreground text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {dashboard.orders.map((order) => (
                  <div
                    key={Number(order.id)}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Package className="h-8 w-8 text-chart-1" />
                      <div>
                        <p className="font-semibold capitalize">
                          {order.packageType} Package
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Number(order.timestamp) / 1000000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.packagePaid ? (
                        <Badge variant="default">Paid</Badge>
                      ) : (
                        <Badge variant="outline">Pending Payment</Badge>
                      )}
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {(dashboard?.forms.length || dashboard?.chatbotLeads.length) ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Leads</CardTitle>
              <CardDescription>Contact information submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboard?.forms.map((form, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg">
                    <p className="font-semibold">{form.name}</p>
                    <p className="text-sm text-muted-foreground">{form.email}</p>
                    <p className="text-sm text-muted-foreground">{form.phone}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(Number(form.timestamp) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                ))}
                {dashboard?.chatbotLeads.map((lead, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg">
                    <p className="font-semibold">{lead.name} (Chatbot)</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.phone}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(Number(lead.timestamp) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
}

export default function DashboardPage() {
  usePageMeta('Dashboard', 'View your orders, leads, and account information.');
  
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
