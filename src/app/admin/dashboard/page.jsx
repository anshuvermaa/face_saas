import { auth, currentUser } from '@clerk/nextjs';
import { getCount, getUsers } from './actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clerkClient } from '@clerk/nextjs/server';

const User = async () => {

    const  usersList = await clerkClient.users.getUserList();
  // const =await getUsers()
  const { userId } = auth();
  // const count=countType(usersList)


  function formatDateToUSA(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }



  const user = await currentUser();
  const count = await getCount()


  const countArray = [
    {
      id: "total",
      count: count.total,
      name: "Total",
    },
    {
      id: "silver",
      count: count.silver,
      name: "Silver",
    },
    {
      id: "gold",
      count: count.gold,
      name: "Gold",
    },
    {
      id: "platinum",
      count: count.platinum,
      name: "Platinum",
    },
  ];

  // Real-time user data
  const users = [
    {
      id: 1,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      role: 'User', // You can update this based on your application's logic
      image: user.imageUrl,
    },
    // Add more users as needed
  ];

  // You can add more user data as needed from the "user" object.
  const arrayData = [1, 2, 3, 4, 5];

  return (
    <div className="bg-indigo-100 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 py-8">
        {/* User Image */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
          <img
            className="object-cover object-center w-full h-full"
            src={user.imageUrl}
            alt="admin"
          />
        </div>

        {/* User Details */}
        <div className="my-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-xl text-gray-600">
            {user.emailAddresses[0].emailAddress}
          </p>
          <p className="text-lg text-indigo-500">
            Role: Admin {countArray[0].count}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-8">
            {countArray.map((item) => (
              <Card key={item.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name} users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-left font-bold">{item.count}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-4 text-gray-700">
            all user&apos;s list is given below
          </p>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-indigo-200">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Plan</th>
                <th className="px-4 py-2">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {/* Display the real-time user data */}
              {usersList.map((user, index) => (
                <tr key={user.id} className="bg-white">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border px-4 py-2">
                    {user.emailAddresses[0].emailAddress}
                  </td>
                  <td className="border px-4 py-2">
                    {(user.publicMetadata.plan)?(user.publicMetadata.plan):("Free")}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDateToUSA(user.lastSignInAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <pre>{JSON.stringify({ userId, user }, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default User;
