'use server'
import { checkExistingAgent } from "@/app/actions/agents";
import AgentsSignupForm from "@/app/components/form/AgentsSignupForm";

export default async function page() {
  await checkExistingAgent();
  return (
    <div>
      <AgentsSignupForm />
    </div>
  )
}


