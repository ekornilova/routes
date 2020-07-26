import React, { FC, useState, useEffect } from 'react';
import { HighlightOff, Add } from '@material-ui/icons';
import { TagLabel, TagIcon, EditTagWrapper, TagWrapper, TagsWrapper, TagInput } from './styles';

const EditTag: FC<{
  onAddTag: (value: string) => void;
  letters: string[];
  label?: string;
  placeHolder?: string;
}> = ({ onAddTag, letters, label, placeHolder }) => {
  const elementRef = React.useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const handleAddTag = () => {
    if (!letters.includes(value)) {
      return;
    }
    onAddTag(value);
    setValue('');
    setIsEdit(false);
  };
  const handleClickOutside = (e: any) => {
    if (
      isEdit &&
      value &&
      elementRef &&
      elementRef.current &&
      !elementRef.current.contains(e.target)
    ) {
      handleAddTag();
    }
  };
  const handleEnterClickInput = (event: any) => {
    if (event.keyCode === 13 && isEdit && value) {
      event.preventDefault();
      handleAddTag();
    }
  };
  useEffect(() => {
    const input = document.getElementById('input_tag');
    if (input) {
      input.addEventListener('keyup', handleEnterClickInput);
    }
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
      if (input) {
        input.removeEventListener('keyup', handleEnterClickInput);
      }
    };
  }, [isEdit, value]);
  const onChangeTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValue(event.target.value);
  };
  const onClickToEdit = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };
  return (
    <EditTagWrapper ref={elementRef} onClick={onClickToEdit}>
      {isEdit ? (
        <TagInput placeholder={placeHolder} id="input_tag" value={value} onChange={onChangeTag} />
      ) : (
        <>
          <TagLabel>{label || 'New Tag'}</TagLabel>
          <TagIcon>
            <Add />
          </TagIcon>
        </>
      )}
    </EditTagWrapper>
  );
};
const Tag: FC<{
  onDelete?: () => void;
  value: string;
  disabled?: boolean;
}> = ({ onDelete, value, disabled }) => {
  const onDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };
  return (
    <TagWrapper>
      <TagLabel>{value}</TagLabel>
      {!disabled && (
        <TagIcon onClick={onDeleteClick}>
          <HighlightOff />
        </TagIcon>
      )}
    </TagWrapper>
  );
};
interface TagsI {
  values: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
  className?: string;
  letters: string[];
  label?: string;
  placeHolder?: string;
}

const Tags: FC<TagsI> = ({
  letters,
  values,
  onChange,
  disabled,
  className,
  label,
  placeHolder,
}) => {
  const [tags, setTags] = useState<string[]>(values);
  useEffect(() => {
    if (tags !== values) {
      setTags(values);
    }
  }, [values]);
  useEffect(() => {
    if (tags !== values && onChange) {
      onChange(tags);
    }
  }, [tags]);
  const onAddTag = (newTag: string) => {
    setTags((oldTags) => {
      const newTags = [...oldTags];
      newTags.push(newTag);
      return newTags;
    });
  };
  const onDeleteTag = (idx: number) => () => {
    setTags((oldTags) => {
      const newTags = [...oldTags];
      newTags.splice(idx, 1);
      return newTags;
    });
  };
  return (
    <TagsWrapper className={className}>
      {tags.map((tag, idx) => {
        return <Tag value={tag} onDelete={onDeleteTag(idx)} disabled={disabled} />;
      })}
      {!disabled && (
        <EditTag label={label} placeHolder={placeHolder} letters={letters} onAddTag={onAddTag} />
      )}
    </TagsWrapper>
  );
};

export default Tags;
