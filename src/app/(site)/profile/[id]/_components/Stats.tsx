import { formatNumber } from "@/lib/utils";
import StatsCard from "./StatsCard";
import { Badges } from "@/types";

type props = {
  reputationPoints: number;
  totalQuestions: number;
  totalAnswers: number;
  badges: Badges;
};

function Stats({
  reputationPoints,
  totalQuestions,
  totalAnswers,
  badges,
}: props) {
  return (
    <div className="mt-10">
      <h3 className="h3-bold text-dark-200 dark:text-white">
        Stats{" "}
        <span className="small-semibold primary-text-gradient">
          {formatNumber(reputationPoints)}
        </span>
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        <div className="border bg-white dark:bg-dark-300 flex-wrap flex items-center justify-evenly gap-4 rounded-md p-6 shadow-light-100 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark-200 dark:text-white">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark-400 dark:text-light-700">
              Questions
            </p>
          </div>

          <div>
            <p className="paragraph-semibold text-dark-200 dark:text-white">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark-400 dark:text-light-700">
              Answers
            </p>
          </div>
        </div>

        <StatsCard
          image="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
          alt="gold medal icon"
        />

        <StatsCard
          image="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
          alt="silver medal icon"
        />

        <StatsCard
          image="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
          alt="bronze medal icon"
        />
      </div>
    </div>
  );
}

export default Stats;
