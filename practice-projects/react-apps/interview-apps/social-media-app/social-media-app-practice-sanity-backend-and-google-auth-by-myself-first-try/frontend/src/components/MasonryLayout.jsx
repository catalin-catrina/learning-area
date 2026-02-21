import React from "react";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Pin from "./Pin";

function MasonryLayout({ pins, user }) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
    >
      <Masonry>
        {pins?.map((pin) => (
          <Pin key={pin._id} pin={pin} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonryLayout;
