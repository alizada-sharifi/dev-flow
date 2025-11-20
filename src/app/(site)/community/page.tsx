import { DataRender, LocalSearch } from "@/components";
import ROUTES from "@/constants/route";
import { EMPRY_USERS } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/types";
import React from "react";
import UserCard from "./_components/UserCard";

async function Community({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { isNext, users } = data || {};
  return (
    <div>
      <h1 className="h1-bold">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          placeholder="There are some great devs here!"
        />
      </div>

      <DataRender
        empty={EMPRY_USERS}
        data={users}
        success={success}
        error={error}
        render={(users) => (
          <div className="flex flex-wrap gap-5 mt-12 ">
            {users.map((user) => (
              <UserCard
                _id={user._id}
                name={user.name}
                username={user.username}
                image={user.image}
                key={user._id}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
}

export default Community;
