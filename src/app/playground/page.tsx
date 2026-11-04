import NeonMaze from "@/components/game/NeonMaze";

export const metadata = {
  title: "Neon Maze Arcade | Luthira Peiris",
  description: "Futuristic 2D neon maze game with procedural cyber sectors.",
};

export default function PlaygroundPage() {
  return (
    <main className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-[#090d16]">
      <NeonMaze />
    </main>
  );
}
