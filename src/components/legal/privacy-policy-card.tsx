import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PrivacyPolicyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
        <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="prose dark:prose-invert">
        <h2>Data Collection</h2>
        <p>We collect the following data through the Threads API:</p>
        <ul>
          <li>Profile information</li>
          <li>Username</li>
          <li>Profile picture</li>
          <li>Biography</li>
        </ul>
        
        <h2>Data Usage</h2>
        <p>Your data is used solely for the functionality of this application.</p>
        
        <h2>Data Deletion</h2>
        <p>You can request data deletion through the app or by uninstalling the app from your Threads account.</p>
      </CardContent>
    </Card>
  )
}
