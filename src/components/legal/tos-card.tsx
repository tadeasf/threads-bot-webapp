import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TosCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="prose dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using this application, you agree to these terms of service.</p>
        
        <h2>2. Data Collection</h2>
        <p>We collect and process data in accordance with our privacy policy.</p>
        
        <h2>3. Account Deletion</h2>
        <p>You can request account deletion at any time through the app settings.</p>
        
        <h2>4. API Usage</h2>
        <p>This application uses the Threads API in accordance with Meta&apos;s terms of service.</p>
      </CardContent>
    </Card>
  )
}
