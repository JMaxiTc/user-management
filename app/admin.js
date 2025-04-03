import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <p>Access Denied</p>;
  }

  if (session.user.role !== "ADMIN") {
    return <p>Access Restricted</p>;
  }

  return <h1>Admin Dashboard</h1>;
}
