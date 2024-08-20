import React from "react";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/Columns";
import { getBlockedUsers } from "@/app/lib/block-service";
import { format } from "date-fns";

interface Props {}

async function Page(props: Props) {
  const {} = props;

  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((user) => {
    return {
      ...user,
      userId: user.blocked.id,
      imageUrl: user.blocked.imageUrl,
      userName: user.blocked.userName,
      createdAt: format(new Date(user.blocked.createdAt), "yyyy-MM-dd"),
    };
  });

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}

export default Page;
