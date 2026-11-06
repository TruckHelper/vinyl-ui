'use client';

import { useState } from 'react';

import { FileUpload } from '@bigmobility/vinyl-ui/file-upload';

import { styled } from 'styled-system/jsx';

const Frame = styled('div', {
  base: {
    width: '100%',
    maxWidth: '34rem',
  },
});

type FileRejection = {
  file: File;
  errors: string[];
};

type FileUploadDemoProps = {
  name: string;
  type?: 'dropzone' | 'button';
  label?: string;
  subText?: string;
  accept?: string;
  maxFiles?: number;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  showRejection?: boolean;
  sampleFileNames?: string[];
};

function createSampleFiles(names: string[]) {
  return names.map((fileName, index) => new File(
    ['a'.repeat(1024 * (index + 1) * 120)],
    fileName,
    { type: 'application/pdf' },
  ));
}

function getRejectionMessage(rejections: FileRejection[]) {
  const errors = rejections.flatMap((rejection) => rejection.errors);

  if (errors.includes('TOO_MANY_FILES')) {
    return '첨부할 수 있는 파일 수를 넘었어요';
  }

  if (errors.includes('FILE_EXISTS')) {
    return '이미 첨부한 파일이에요';
  }

  if (errors.includes('FILE_INVALID_TYPE')) {
    return '첨부할 수 없는 파일 형식이에요';
  }

  return '첨부할 수 없는 파일이에요';
}

export default function FileUploadDemo({
  name,
  type = 'dropzone',
  label = '첨부 서류',
  subText,
  accept,
  maxFiles = 1,
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
  showRejection = false,
  sampleFileNames = [],
}: FileUploadDemoProps) {
  const [files, setFiles] = useState<File[]>(() => createSampleFiles(sampleFileNames));
  const [rejectionMessage, setRejectionMessage] = useState('');

  const handleChangeFiles = ({ value }: { name: string; value: File[] }) => {
    setFiles(value);
    setRejectionMessage('');
  };

  const handleRejectFiles = ({ value }: { name: string; value: FileRejection[] }) => {
    setRejectionMessage(getRejectionMessage(value));
  };

  return (
    <Frame>
      <FileUpload
        name={name}
        files={files}
        type={type}
        label={label}
        subText={subText}
        accept={accept}
        maxFiles={maxFiles}
        required={required}
        disabled={disabled}
        hasError={hasError}
        errorMessage={showRejection ? rejectionMessage : errorMessage}
        onChangeFiles={handleChangeFiles}
        onRejectFiles={showRejection ? handleRejectFiles : undefined}
      />
    </Frame>
  );
}
