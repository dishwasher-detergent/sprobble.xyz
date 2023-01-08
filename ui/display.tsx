"use client";

import { Artist } from "#/app/page";
import { Filter, LayoutGrid, LayoutList } from "lucide-react";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DisplayProps {
  files: Artist[];
}

type Pagination = {
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
};

export default function Display({ files }: DisplayProps) {
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<Pagination>({
    previousPage: 0,
    nextPage: 0,
    total: 0,
    totalPages: 0,
  });
  const [content, setContent] = useState<Artist[]>([]);
  const [layout, setLayout] = useState("grid-cols-3");
  const [sort, setSort] = useState<"count" | "msPlayed">("count");
  const [search, setSearch] = useState("");

  const millisToMinutesAndSeconds = (millis: number) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
  };

  const paginate = (items: Artist[], page = 1, perPage = 10) => {
    const offset = perPage * (page - 1);
    const totalPages = Math.ceil(items.length / perPage);
    const paginatedItems = items.slice(offset, perPage * page);

    return {
      previousPage: page - 1 ? page - 1 : null,
      nextPage: totalPages > page ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      items: paginatedItems,
    };
  };

  useEffect(() => {
    const paginateContent = paginate(
      files
        .sort((a, b) => (a.artist[sort] > b.artist[sort] ? -1 : 1))
        .filter((item) =>
          item.artist.name.toLowerCase().includes(search.toLowerCase())
        ),
      page
    );
    setContent(paginateContent.items);
    setPageInfo({
      previousPage: paginateContent.previousPage,
      nextPage: paginateContent.nextPage,
      total: paginateContent.total,
      totalPages: paginateContent.totalPages,
    });
  }, [page, sort, search]);

  return (
    <>
      <div className="w-full border border-slate-200 bg-white mb-4 p-2 rounded-xl flex flex-row items-center gap-4">
        <div className="flex-1">
          <Search search={(e) => setSearch(e)} />
        </div>
        <div className="flex-none flex flex-row gap-1">
          <SortDrop sort={(e: "count" | "msPlayed") => setSort(e)} />
          <button
            className="hover:bg-slate-200 rounded-xl p-2"
            onClick={() =>
              setLayout(layout == "grid-cols-3" ? "grid-cols-1" : "grid-cols-3")
            }
          >
            {layout == "grid-cols-3" ? (
              <LayoutList size={20} />
            ) : (
              <LayoutGrid size={20} />
            )}
          </button>
        </div>
      </div>
      <div className={`grid gap-4 ${layout}`}>
        {content.map((file) => {
          return (
            <div
              key={file.artist.name}
              className="border rounded-xl border-slate-200 bg-white p-4"
            >
              <div className="pb-4">
                <h2 className="text-2xl font-bold pb-2">{file.artist.name}</h2>
                <p className="text-sm font-semibold text-slate-500">
                  You listened to their music{" "}
                  <span className="font-bold text-base">
                    {file.artist.count}
                  </span>{" "}
                  times, totaling{" "}
                  <span className="font-bold text-base">
                    {millisToMinutesAndSeconds(file.artist.msPlayed)}
                  </span>{" "}
                  minutes played!
                </p>
              </div>
              <h3 className="font-semibold pb-2">
                Here are the songs you listed to from this artist!
              </h3>
              <div className="w-full h-64 overflow-auto border rounded-xl">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        Song Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        Listen Count
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                      >
                        Play Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(file.song)
                      .sort((a, b) => (a.count > b.count ? -1 : 1))
                      .map((song, index: number) => {
                        return (
                          <tr key={song.name} className="border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                              {song.name}
                            </td>
                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                              {song.count}
                            </td>
                            <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                              {millisToMinutesAndSeconds(song.msPlayed)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center pt-6">
        <div className="rounded-xl border border-slate-200 overflow-hidden flex flex-row flex-nowrap items-center">
          <button
            className="w-24 h-12 bg-white text-slate-900 font-bold text-sm"
            onClick={() =>
              setPage(pageInfo.previousPage ? pageInfo.previousPage : 1)
            }
          >
            Prev
          </button>
          <p>
            <input
              className="font-bold text-sm bg-slate-800 text-white px-4 w-16 h-10 rounded-md text-center"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
            />
          </p>
          <button
            className="w-24 h-12 bg-white text-slate-900 font-bold text-sm"
            onClick={() => setPage(pageInfo.nextPage ? pageInfo.nextPage : 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

const SortDrop = ({ sort }: { sort: (e: "count" | "msPlayed") => void }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="hover:bg-slate-200 rounded-xl p-2">
          <Filter size={20} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white border border-slate-200 rounded-xl p-2">
          <DropdownMenu.Item
            className="w-full hover:bg-slate-200 rounded-xl p-2"
            onClick={() => sort("count")}
          >
            Sort by Listen Count
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="w-full hover:bg-slate-200 rounded-xl p-2"
            onClick={() => sort("msPlayed")}
          >
            Sort by Play Time
          </DropdownMenu.Item>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const Search = ({ search }: { search: (e: string) => void }) => {
  return (
    <div className="w-full">
      <input
        className="border w-full border-slate-200 rounded-xl p-2 text-sm"
        placeholder="Search Artists"
        type="text"
        onChange={(e) => search(e.target.value)}
      />
    </div>
  );
};
