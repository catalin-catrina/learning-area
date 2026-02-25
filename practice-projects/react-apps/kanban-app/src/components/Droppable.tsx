import { useDroppable } from "@dnd-kit/react";

function Droppable({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  return <div ref={ref}>{children}</div>;
}

export default Droppable;
