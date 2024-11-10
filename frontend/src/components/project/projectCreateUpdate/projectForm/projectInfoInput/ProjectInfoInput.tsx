import style from './ProjectInfoInput.module.css';

import DefaultProject from '../../../../../assets/image/icon/DefaultProject.svg';

import { useRef } from 'react';
import useProjectStore from '../../../../../store/useProjectStore';
import ImageWithDefault from '../../../../my/ImageWithDefault';

interface Props {
  image: string;
  title: string;
  description: string;
}

function ProjectInfoInput({ image, title, description }: Props) {
  const updateProject = useProjectStore((state) => state.updateProjectField);
  const { titleError, setTitleError, setErrMsgOn } = useProjectStore();

  // const [imgSrc, setImgSrc] = useState(project.imgSrc);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file); // 새 이미지 URL 생성
      // setImgSrc(newImageUrl); // 이미지 상태 업데이트
      updateProject('image', newImageUrl);
    }
  };

  const handleTitleError = (value: boolean) => {
    setTitleError(value);

    if (!titleError) {
      setErrMsgOn(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    updateProject('title', value);
    if (value !== '') {
      handleTitleError(false);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    updateProject('description', value);
  };

  return (
    <div className={style.container}>
      <div className={style.inputLabel}>
        <p className={style.label}>
          <span>대표이미지/프로젝트명</span>
          <span className={style.requiredMark}>*</span>
        </p>
        <div className={style.titleContainer}>
          <div className={style.img}>
            <ImageWithDefault
              src={image}
              alt="로고"
              defaultSrc={DefaultProject}
              onClick={handleImgClick}
            />
          </div>

          <input
            className={style.hiddenInput}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={imgInputRef}
          />
          <div className={style.titleInputContainer}>
            <input
              className={`${style.titleInput} ${titleError && style.titleError}`}
              type="text"
              maxLength={20}
              value={title}
              onChange={handleTitleChange}
              placeholder="프로젝트 이름을 입력해주세요 ! (20자 이내)"
            />
            {titleError && (
              <span className={style.error}>
                프로젝트 명은 필수 입력값입니다.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={style.inputLabel}>
        <span className={style.label}>프로젝트 개요</span>
        <textarea
          className={style.summary}
          rows={3}
          maxLength={100}
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
    </div>
  );
}

export default ProjectInfoInput;
