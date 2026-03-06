import { Users, Shuffle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 p-4 sm:p-8">
      <main className="w-full max-w-xl bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-1">
            <Shuffle size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            팀 랜덤 선택기
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-center text-sm sm:text-base">
            회식 메뉴, 발표 순서 등을 빠르고 공정하게 정해보세요!
          </p>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            항목 입력 (쉼표나 줄바꿈으로 구분)
          </label>
          <textarea
            className="w-full h-40 p-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow dark:text-white dark:placeholder:text-zinc-600"
            placeholder="김철수, 이영희, 박지성&#10;또는&#10;마라탕&#10;돈까스&#10;제육볶음"
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors active:scale-95">
            전체 순서 섞기
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all active:scale-95">
            하나만 뽑기
          </button>
        </div>
      </main>
    </div>
  );
}
