import Client from "./client";

type Props = {
  searchParams: {
    search: string;
    favorites: string;
  };
};

export const generateMetadata = ({ searchParams }: Props) => {
  if (searchParams.favorites === "true") {
    return {
      title: "Favorites | Brain Board",
    };
  }

  if (searchParams.search) {
    return {
      title: `Search: ${searchParams.search} | Brain Board`,
    };
  }

  return {
    title: "Dashboard | Brain Board",
  };
};

export default function Dashboard({ searchParams }: Props) {
  return (
    <div className="flex flex-1 flex-col p-6">
      <Client query={searchParams} />
    </div>
  );
}
