import { useEffect } from 'react';

interface Props {
  changesSaved: boolean;
}

const UnsavedChangesPrompt = ({ changesSaved }: Props) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (changesSaved) {
        event.preventDefault();
        event.returnValue =
          'Are you sure you want to leave? You have unsaved changes. Please press (control+ s) to save';
        return 'Are you sure you want to leave? You have unsaved changes. Please press (control+ s) to save';
      }
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, [changesSaved]);

  return null;
};

export default UnsavedChangesPrompt;
