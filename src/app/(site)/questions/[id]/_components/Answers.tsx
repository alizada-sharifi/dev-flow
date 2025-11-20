import { DataRender, Filter, Pagination } from "@/components";
import { EMPTY_ANSWERS } from "@/constants/states";
import { ActionResponse, AnswerType } from "@/types";
import AnswerCard from "./AnswerCard";
import { answerFilters } from "@/constants/filters";

interface props extends ActionResponse<AnswerType[]> {
  totalAnswers: number;
  page: number;
  isNext: boolean;
}

function Answers({ totalAnswers, data, success, error, page, isNext }: props) {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <Filter
          filters={answerFilters}
          triggerClassName="sm:min-w-32"
          containerClassName="max-xs:w-full"
        />
      </div>

      <DataRender
        data={data}
        success={success}
        error={error}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard {...answer} key={answer._id} />)
        }
      />

      <Pagination isNext={isNext} page={page} />
    </div>
  );
}

export default Answers;
