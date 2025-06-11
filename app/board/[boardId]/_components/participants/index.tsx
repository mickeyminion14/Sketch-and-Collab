export const Participants = () => {
  return (
    <div className="absolute h-12 top-2 right-2 rounded-md p-3 flex items-center shadow-md">
      List of users
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 rounded-md p-3 bg-white flex items-center shadow-md w-[300px]">
      <div className="h-full w-full bg-muted-400" />
    </div>
  );
};
