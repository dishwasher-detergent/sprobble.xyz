import { Models } from "appwrite";

export async function generateMetadata({
  params,
}: {
  params: { user: string };
}) {
  const id = params.user;

  // fetch data
  const user: Models.User<any> = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/v1/users/${id}`,
    {
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
        "X-Appwrite-Key": process.env.APPWRITE_API_KEY as string,
      },
    }
  ).then((res) => res.json());

  return {
    title: user.name + "'s Listen History",
    description: `Listen history for ${user.name}`,
    openGraph: {
      title: user.name,
      description: `Stats for ${user.name}`,
      url: `https://sprobble.xyz/user/${user.$id}/history/`,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const id = params.user;

  // fetch data
  const user: Models.User<any> = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/v1/users/${id}`,
    {
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
        "X-Appwrite-Key": process.env.APPWRITE_API_KEY as string,
      },
    }
  ).then((res) => res.json());

  return (
    <>
      <h4 className="text-sm text-slate-600">@{user.name}&apos;s</h4>
      {children}
    </>
  );
}
