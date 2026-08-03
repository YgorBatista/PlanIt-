import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const { data: session } = useSession();

  const [manualEmail, setManualEmail] = useState<string | null>(null);

  useEffect(() => {
    setManualEmail(localStorage.getItem("userEmail"));
  }, []);

  const userEmail = session?.user?.email || manualEmail;

  return { userEmail };
}