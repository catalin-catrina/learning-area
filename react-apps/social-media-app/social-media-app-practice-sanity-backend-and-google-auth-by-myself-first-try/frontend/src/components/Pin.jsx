import React, { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";

import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../sanityClient";

function Pin({ pin: { postedBy, image, _id, destination, save } }) {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [user, setUser] = useState(null);
  const [postHovered, setPostHovered] = useState(false);
  const alreadySaved = !!save?.filter((save) => save.userId === user?.aud)
    ?.length;

  //   console.log(postedBy, image, _id, destination, save);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.aud,
            postedBy: {
              _type: "postedBy",
              _ref: user?.aud,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  //   console.log(save.userId, user.name);
  const unsavePin = (id) => {
    if (alreadySaved) {
      client
        .patch(id)
        .unset([`save[userId=="${user.aud}"]`])
        .commit()
        .then(() => window.location.reload());
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => window.location.reload());
  };

  return (
    <div
      className="rounded-lg m-5"
      onMouseEnter={() => setPostHovered(true)}
      onMouseLeave={() => setPostHovered(false)}
    >
      <div className="relative">
        <div className="">
          <img src={urlFor(image).url()} className="w-full" alt="pin" />
        </div>

        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col p-5 justify-between"
            style={{ background: "rgba(0,0,0,0.3)", height: "100%" }}
          >
            <div className="flex justify-between">
              <div>
                <a href={`${image?.asset?.url}?dl=`} download>
                  <IoMdDownload size={30} color="white" />
                </a>
              </div>
              <div>
                {!alreadySaved && (
                  <button
                    className="bg-red-700 rounded-xl text-white px-5 py-2 text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                  >
                    Save
                  </button>
                )}
                {alreadySaved && (
                  <button
                    className="bg-red-700 rounded-xl text-white px-5 py-2 text-center"
                    onClick={() => unsavePin(_id)}
                  >
                    Saved
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <div className="text-white text-xl">
                <a href={destination}>{destination}</a>
              </div>
              <div onClick={() => deletePin(_id)} className="cursor-pointer">
                <IoTrashOutline size={30} color="white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pin;
