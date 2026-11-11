'use client';

import type { ComponentProps } from 'react';

import { FileUpload as ArkFileUpload } from '@ark-ui/react';

import { styled } from 'styled-system/jsx/factory';

import { ErrorMessage } from '../field/ErrorMessage';
import { FieldContextProvider } from '../field/FieldContext';
import { Label } from '../field/Label';
import { createErrorId } from '../field/utils';
import { Icon } from '../icon/Icon';

const Container = styled(ArkFileUpload.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    width: '100%',
    '&[data-variant=button]': { alignItems: 'flex-start' },
  },
});

const Dropzone = styled(ArkFileUpload.Dropzone, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16',
    paddingInline: '12',
    width: '100%',
    height: '16rem',
    border: '1px dashed',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    color: 'text.default',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: {
      backgroundColor: 'layout.primary-subtle',
      borderColor: 'layout.highlight-line',
    },
    '&[data-dragging]': {
      backgroundColor: 'layout.primary-subtle',
      borderColor: 'layout.highlight-line',
    },
    '&[data-invalid]': {
      backgroundColor: 'layout.bg-issue',
      borderColor: 'layout.issue-line',
      _hover: {
        backgroundColor: 'layout.bg-issue',
        borderColor: 'layout.issue-line',
      },
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'layout.highlight-line',
      color: 'text.disable',
      cursor: 'not-allowed',
      _hover: {
        backgroundColor: 'layout.bg-disable',
        borderColor: 'layout.highlight-line',
      },
    },
  },
});

const DropzoneIcon = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '2.4rem',
    color: 'text.soft',
  },
});

const DropzoneText = styled('span', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4',
  },
});

const DropzoneTitle = styled('span', {
  base: {
    textStyle: 'body.medium-normal',
  },
});

const DropzoneSubText = styled('span', {
  base: {
    textStyle: 'body.medium-light',
    color: 'text.soft',
    '[data-disabled] &': { color: 'text.disable' },
  },
});

const Trigger = styled(ArkFileUpload.Trigger, {
  base: {
    textStyle: 'button.medium-normal',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4',
    paddingInline: '16',
    paddingBlock: '12',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
    color: 'text.default',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.2s',
    _hover: {
      backgroundColor: 'layout.primary-subtle',
      borderColor: 'layout.highlight-line',
    },
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      backgroundColor: 'layout.bg-disable',
      borderColor: 'transparent',
      color: 'text.disable',
      cursor: 'not-allowed',
      _hover: {
        backgroundColor: 'layout.bg-disable',
        borderColor: 'transparent',
      },
    },
  },
});

const TriggerIcon = styled('span', {
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    fontSize: '2rem',
  },
});

const ItemGroup = styled(ArkFileUpload.ItemGroup, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    margin: '0',
    padding: '0',
    maxWidth: '100%',
    listStyle: 'none',
    '[data-variant=dropzone] > &': { width: '100%' },
  },
});

const Item = styled(ArkFileUpload.Item, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16',
    padding: '16',
    minWidth: '24rem',
    border: '1px solid',
    borderColor: 'layout.default-line',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light',
  },
});

const ItemPreview = styled(ArkFileUpload.ItemPreview, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '4.8rem',
    height: '4.8rem',
    borderRadius: '8',
    backgroundColor: 'layout.bg-light-gray',
    color: 'text.default',
    fontSize: '2rem',
  },
});

const ItemInfo = styled('div', {
  base: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    gap: '16',
    minWidth: '0',
  },
});

const ItemText = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
  },
});

const ItemName = styled(ArkFileUpload.ItemName, {
  base: {
    textStyle: 'body.medium-normal',
    overflow: 'hidden',
    color: 'text.default',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const ItemSizeText = styled(ArkFileUpload.ItemSizeText, {
  base: {
    textStyle: 'body.small-light',
    color: 'text.soft',
  },
});

const ItemDeleteTrigger = styled(ArkFileUpload.ItemDeleteTrigger, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '0',
    width: '2.4rem',
    height: '2.4rem',
    border: 'none',
    borderRadius: '4',
    backgroundColor: 'transparent',
    color: 'text.default',
    fontSize: '2rem',
    cursor: 'pointer',
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'layout.highlight-line',
      outlineOffset: '2px',
    },
    _disabled: {
      color: 'text.disable',
      cursor: 'not-allowed',
    },
  },
});

type RootProps = ComponentProps<typeof ArkFileUpload.Root>;

export type FileUploadProps = {
  name: string;
  files: File[];
  variant?: 'dropzone' | 'button';
  label?: string;
  title?: string;
  subText?: string;
  buttonText?: string;
  accept?: RootProps['accept'];
  maxFiles?: number;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  removeLabel?: (fileName: string) => string;
  onChangeFiles: ({ name, value }: {
    name: string;
    value: File[];
  }) => void;
  onRejectFiles?: ({ name, value }: {
    name: string;
    value: ArkFileUpload.FileRejection[];
  }) => void;
};

function defaultRemoveLabel(fileName: string) {
  return `${fileName} 삭제`;
}

export function FileUpload({
  name,
  files,
  variant = 'dropzone',
  label,
  title = '파일을 업로드해주세요',
  subText,
  buttonText = '파일 첨부',
  accept,
  maxFiles = 1,
  required = false,
  disabled = false,
  hasError = false,
  errorMessage,
  className,
  removeLabel = defaultRemoveLabel,
  onChangeFiles,
  onRejectFiles,
}: FileUploadProps) {
  const inputId = `file-upload-${name}`;
  const errorId = createErrorId(inputId);
  const invalid = hasError || !!errorMessage;
  const describedBy = invalid && errorMessage ? errorId : undefined;

  const handleFileAccept = (details: ArkFileUpload.FileAcceptDetails) => {
    onChangeFiles({
      name,
      value: details.files,
    });
  };

  const handleFileReject = (details: ArkFileUpload.FileRejectDetails) => {
    if (details.files.length === 0) {
      return;
    }

    onRejectFiles?.({
      name,
      value: details.files,
    });
  };

  return (
    <FieldContextProvider
      value={{
        inputId,
        errorId,
        required,
        hasError: invalid,
        disabled,
      }}
    >
      <Container
        className={className}
        data-variant={variant}
        name={name}
        acceptedFiles={files}
        accept={accept}
        maxFiles={maxFiles}
        required={required}
        disabled={disabled}
        invalid={invalid}
        ids={{ hiddenInput: inputId }}
        translations={{
          dropzone: label ?? title,
          deleteFile: (file) => removeLabel(file.name),
        }}
        onFileAccept={handleFileAccept}
        onFileReject={handleFileReject}
      >
        {label ? (
          <Label>
            {label}
          </Label>
        ) : null}
        {variant === 'dropzone' ? (
          <Dropzone aria-describedby={describedBy}>
            <DropzoneIcon>
              <Icon name="upload" />
            </DropzoneIcon>
            <DropzoneText>
              <DropzoneTitle>
                {title}
              </DropzoneTitle>
              {subText ? (
                <DropzoneSubText>
                  {subText}
                </DropzoneSubText>
              ) : null}
            </DropzoneText>
          </Dropzone>
        ) : (
          <Trigger aria-describedby={describedBy}>
            <TriggerIcon>
              <Icon name="paperclip" />
            </TriggerIcon>
            {buttonText}
          </Trigger>
        )}
        {files.length > 0 ? (
          <ItemGroup>
            {files.map((file) => (
              <Item
                key={`${file.name}-${file.size}-${file.lastModified}`}
                file={file}
              >
                <ItemInfo>
                  <ItemPreview>
                    <Icon name="file" />
                  </ItemPreview>
                  <ItemText>
                    <ItemName />
                    <ItemSizeText />
                  </ItemText>
                </ItemInfo>
                <ItemDeleteTrigger>
                  <Icon name="x" />
                </ItemDeleteTrigger>
              </Item>
            ))}
          </ItemGroup>
        ) : null}
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
        <ArkFileUpload.HiddenInput />
      </Container>
    </FieldContextProvider>
  );
}
