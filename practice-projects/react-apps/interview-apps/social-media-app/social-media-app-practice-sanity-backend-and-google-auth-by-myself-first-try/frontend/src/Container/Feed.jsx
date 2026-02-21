import React, { useState, useEffect } from "react";

import MasonryLayout from "../components/MasonryLayout";
import { getPins } from "../queries";
import { client } from "../sanityClient";

function Feed({ user }) {
  const [pins, setPins] = useState(null);

  useEffect(() => {
    const query = getPins;

    client.fetch(query).then((data) => {
      setPins(data);
    });
  }, []);

  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  );
}

export default Feed;
