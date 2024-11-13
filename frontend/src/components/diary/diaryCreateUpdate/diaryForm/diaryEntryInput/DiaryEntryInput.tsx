import style from './DiaryEntryInput.module.css';

import useDiaryStore from '../../../../../store/useDiaryStore';

interface Props {
  index: number;
  question: string;
  description: string;
  answer: string;
  circleRef: React.RefObject<HTMLDivElement> | null;
  lineRef: React.RefObject<HTMLDivElement> | null;
}

function QnaInput({
  index,
  question,
  description,
  answer,
  circleRef,
  lineRef,
}: Props) {
  const updateAnswer = useDiaryStore((state) => state.updateAnswer);

  const handleText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAnswer(index - 1, event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.questionContainer}>
        <div ref={circleRef} className={style.outerCircle}>
          <div className={style.innerCircle}>{index}</div>
          <div ref={lineRef} className={style.line}></div>
        </div>
        <span className={style.question}>{question}</span>
      </div>

      <p
        className={style.description}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></p>

      <div className={style.answerContainer}>
        <textarea
          className={style.textArea}
          value={answer}
          onChange={handleText}
          maxLength={500}
        ></textarea>
        <p className={style.textLength}>{answer.length} / 500자</p>
      </div>
    </div>
  );
}

export default QnaInput;
