import { useMutation, useSelf } from "@liveblocks/react";

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection) || [];

  return useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const layerIds = storage.get("layerIds");

      for (const id of selection) {
        liveLayers.delete(id);
        const idx = layerIds.indexOf(id);
        if (idx !== -1) {
          layerIds.delete(idx);
        }
      }
      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection]
  );
};
