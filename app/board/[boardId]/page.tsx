import Room from "../../../components/liveblocks/room";
import Canvas from "./_components/canvas";
import CanvasLoader from "./_components/canvas/loader";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = ({ params: { boardId } }: BoardPageProps) => {
  return (
    <Room roomId={boardId} fallback={<CanvasLoader />}>
      <Canvas boardId={boardId} />;
    </Room>
  );
};

export default BoardPage;
