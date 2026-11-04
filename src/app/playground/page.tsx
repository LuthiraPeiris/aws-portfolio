
import NeonMaze from "@/components/game/NeonMaze";

export const metadata = {
  title: "Neon Maze | Luthira Peiris",
  description: "Explore the Neon Maze arcade game.",
};

export default function PlaygroundPage() {
  return (
    <main className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-[#111827]">
      <NeonMaze />
    </main>
  );
}
