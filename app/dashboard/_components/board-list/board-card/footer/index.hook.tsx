import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { useApiMutation } from "../../../../../../hooks/use-api-mutation";
import { GetTypeWithSystemFields } from "../../../../../../types";

const useFooter = ({
  isFavorite,
  board,
}: {
  isFavorite: boolean;
  board: GetTypeWithSystemFields<"boards">;
}) => {
  const { mutate: favoriteBoard, pending: pendingFavorite } = useApiMutation(
    api.mutations.board.favoriteBoard
  );
  const { mutate: removeFavoriteBoard, pending: pendingRemoveFavorite } =
    useApiMutation(api.mutations.board.removeFavoriteBoard);
  const toggleFavorite = async () => {
    if (isFavorite) {
      try {
        await removeFavoriteBoard({ boardId: board._id });
      } catch {
        toast.error("Failed to remove favorite");
      }
    } else {
      try {
        await favoriteBoard({ boardId: board._id, orgId: board.orgId });
      } catch {
        toast.error("Failed to favorite board");
      }
    }
  };
  return { toggleFavorite, pendingRemoveFavorite, pendingFavorite };
};
export default useFooter;
