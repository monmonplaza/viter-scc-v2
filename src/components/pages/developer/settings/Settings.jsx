import Breadcrumbs from "@/components/partials/Breadcrumbs.jsx";
import Footer from "@/components/partials/Footer.jsx";
import Header from "@/components/partials/Header.jsx";
import Navigation from "@/components/partials/Navigation.jsx";
import Pill from "@/components/partials/Pill";
import { Archive, ArchiveRestore, Plus, SquarePen, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const links = [
    { label: "Unit" },
    { label: "Setting 1" },
    { label: "Settings" },
    { label: "Unit 4" },
    { label: "Unit 5" },
  ];

  return (
    <>
      <div className="parent-wrap flex bg-secondary -ml-[250px] md:ml-0">
        <aside>
          <Navigation menu="settings" />
        </aside>
        <main className="w-full ">
          <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
            <Header />

            <div className="main-wrapper p-2 md:p-8 bg-secondary">
              <Breadcrumbs />

              <div className="flex justify-between items-center my-5">
                <h1 className="mb-0">Settings</h1>
              </div>
              {/* <UnitList /> */}

              <div className="setting-nav">
                <ul className="flex gap-7 border-b border-line pb-1">
                  {links.map((link, key) => {
                    return (
                      <li key={key} className="">
                        <Link to="/" className="text-xs pb-2 px-1 active">
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="setting-main py-10 max-w-[700px] w-full ">
                <div class="flex justify-between items-end">
                  <h2 className="mb-0">Unit</h2>
                  <button className="btn btn-accent btn-sm">
                    <Plus /> Add
                  </button>
                </div>

                <div className="table-wrapper max-w-[700px] w-full my-5">
                  <table>
                    <thead>
                      <tr>
                        <th className="w-counter">#</th>
                        <th className="w-[200px]">Status</th>
                        <th>Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-counter">1</td>
                        <td className="w-[200px]">
                          <Pill />
                        </td>
                        <td>Per Box</td>
                        <td className="table-action">
                          <ul>
                            {1 ? (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Edit"
                                    className="tooltip"
                                  >
                                    <SquarePen size={14} />
                                  </button>
                                </li>

                                <li>
                                  <button
                                    data-tooltip="Archive"
                                    className="tooltip"
                                  >
                                    <Archive size={14} />
                                  </button>
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  <button
                                    data-tooltip="Restore"
                                    className="tooltip"
                                  >
                                    <ArchiveRestore size={14} />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    data-tooltip="Delete"
                                    className="tooltip"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </li>
                              </>
                            )}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
