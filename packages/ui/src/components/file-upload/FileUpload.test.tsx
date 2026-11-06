import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { FileUpload } from './FileUpload';

const context = describe;

function createFile(name: string, size = 1024) {
  return new File(['a'.repeat(size)], name, { type: 'application/pdf' });
}

function getHiddenInput(container: HTMLElement) {
  return container.querySelector('input[type="file"]') as HTMLInputElement;
}

describe('FileUpload', () => {
  const handleChangeFiles = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dropzone with label and texts', () => {
    render((
      <FileUpload
        name="document"
        files={[]}
        label="첨부 서류"
        subText="PDF만 올릴 수 있어요"
        onChangeFiles={handleChangeFiles}
      />
    ));

    expect(screen.getByText('첨부 서류')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '첨부 서류' })).toBeInTheDocument();
    expect(screen.getByText('파일을 업로드해주세요')).toBeInTheDocument();
    expect(screen.getByText('PDF만 올릴 수 있어요')).toBeInTheDocument();
  });

  it('renders trigger button when type is button', () => {
    render((
      <FileUpload
        name="document"
        files={[]}
        type="button"
        onChangeFiles={handleChangeFiles}
      />
    ));

    expect(screen.getByRole('button', { name: '파일 첨부' })).toBeInTheDocument();
    expect(screen.queryByText('파일을 업로드해주세요')).not.toBeInTheDocument();
  });

  it('connects label to hidden file input with name', () => {
    const { container } = render((
      <FileUpload
        name="document"
        files={[]}
        label="첨부 서류"
        required
        onChangeFiles={handleChangeFiles}
      />
    ));

    const input = getHiddenInput(container);

    expect(input).toHaveAttribute('name', 'document');
    expect(input).toHaveAttribute('id', 'file-upload-document');
    expect(input).toBeRequired();
    expect(screen.getByText('첨부 서류').closest('label')).toHaveAttribute('for', 'file-upload-document');
  });

  it('calls onChangeFiles with selected file', async () => {
    const { container } = render((
      <FileUpload
        name="document"
        files={[]}
        onChangeFiles={handleChangeFiles}
      />
    ));

    const file = createFile('report.pdf');

    fireEvent.input(getHiddenInput(container), { target: { files: [file] } });

    await waitFor(() => expect(handleChangeFiles).toHaveBeenCalledWith({
      name: 'document',
      value: [file],
    }));
  });

  it('adds selected files to current files when maxFiles is more than one', async () => {
    const current = createFile('first.pdf');
    const { container } = render((
      <FileUpload
        name="document"
        files={[current]}
        maxFiles={3}
        onChangeFiles={handleChangeFiles}
      />
    ));

    const file = createFile('second.pdf', 2048);

    fireEvent.input(getHiddenInput(container), { target: { files: [file] } });

    await waitFor(() => expect(handleChangeFiles).toHaveBeenCalledWith({
      name: 'document',
      value: [current, file],
    }));
  });

  it('renders file items from files prop', () => {
    render((
      <FileUpload
        name="document"
        files={[createFile('report.pdf'), createFile('photo.pdf', 2048)]}
        maxFiles={2}
        onChangeFiles={handleChangeFiles}
      />
    ));

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(screen.getByText('photo.pdf')).toBeInTheDocument();
  });

  it('does not render file list when files is empty', () => {
    render((
      <FileUpload
        name="document"
        files={[]}
        onChangeFiles={handleChangeFiles}
      />
    ));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('removes file when delete button is clicked', async () => {
    const first = createFile('first.pdf');
    const second = createFile('second.pdf', 2048);

    render((
      <FileUpload
        name="document"
        files={[first, second]}
        maxFiles={2}
        onChangeFiles={handleChangeFiles}
      />
    ));

    fireEvent.click(screen.getByRole('button', { name: 'first.pdf 삭제' }));

    await waitFor(() => expect(handleChangeFiles).toHaveBeenCalledWith({
      name: 'document',
      value: [second],
    }));
  });

  it('keeps files as given by files prop', () => {
    const { rerender } = render((
      <FileUpload
        name="document"
        files={[createFile('report.pdf')]}
        onChangeFiles={handleChangeFiles}
      />
    ));

    fireEvent.click(screen.getByRole('button', { name: 'report.pdf 삭제' }));

    expect(screen.getByText('report.pdf')).toBeInTheDocument();

    rerender((
      <FileUpload
        name="document"
        files={[]}
        onChangeFiles={handleChangeFiles}
      />
    ));

    expect(screen.queryByText('report.pdf')).not.toBeInTheDocument();
  });

  it('opens file picker with Enter key on dropzone', async () => {
    const { container } = render((
      <FileUpload
        name="document"
        files={[]}
        label="첨부 서류"
        onChangeFiles={handleChangeFiles}
      />
    ));

    const clickSpy = jest.spyOn(getHiddenInput(container), 'click');

    fireEvent.keyDown(screen.getByRole('button', { name: '첨부 서류' }), { key: 'Enter' });

    await waitFor(() => expect(clickSpy).toHaveBeenCalled());
  });

  it('opens file picker with Space key on dropzone', async () => {
    const { container } = render((
      <FileUpload
        name="document"
        files={[]}
        label="첨부 서류"
        onChangeFiles={handleChangeFiles}
      />
    ));

    const clickSpy = jest.spyOn(getHiddenInput(container), 'click');

    fireEvent.keyDown(screen.getByRole('button', { name: '첨부 서류' }), { key: ' ' });

    await waitFor(() => expect(clickSpy).toHaveBeenCalled());
  });

  it('uses removeLabel for delete button name', () => {
    render((
      <FileUpload
        name="document"
        files={[createFile('report.pdf')]}
        removeLabel={(fileName) => `Remove ${fileName}`}
        onChangeFiles={handleChangeFiles}
      />
    ));

    expect(screen.getByRole('button', { name: 'Remove report.pdf' })).toBeInTheDocument();
  });

  it('calls onRejectFiles when selected files exceed maxFiles', async () => {
    const handleRejectFiles = jest.fn();
    const current = createFile('first.pdf');
    const { container } = render((
      <FileUpload
        name="document"
        files={[current]}
        maxFiles={2}
        onChangeFiles={handleChangeFiles}
        onRejectFiles={handleRejectFiles}
      />
    ));

    const second = createFile('second.pdf', 2048);
    const third = createFile('third.pdf', 3072);

    fireEvent.input(getHiddenInput(container), { target: { files: [second, third] } });

    await waitFor(() => expect(handleRejectFiles).toHaveBeenCalledWith({
      name: 'document',
      value: [
        { file: second, errors: ['TOO_MANY_FILES'] },
        { file: third, errors: ['TOO_MANY_FILES'] },
      ],
    }));

    expect(handleChangeFiles).not.toHaveBeenCalled();
  });

  context('when hasError is true', () => {
    it('renders error message linked to dropzone', () => {
      render((
        <FileUpload
          name="document"
          files={[]}
          label="첨부 서류"
          hasError
          errorMessage="파일을 첨부해주세요"
          onChangeFiles={handleChangeFiles}
        />
      ));

      expect(screen.getByRole('alert')).toHaveTextContent('파일을 첨부해주세요');
      expect(screen.getByRole('button', { name: '첨부 서류' }))
        .toHaveAttribute('aria-describedby', 'file-upload-document-error');
    });
  });

  context('when only errorMessage is given', () => {
    it('renders error message as invalid state', () => {
      render((
        <FileUpload
          name="document"
          files={[]}
          label="첨부 서류"
          errorMessage="파일을 첨부해주세요"
          onChangeFiles={handleChangeFiles}
        />
      ));

      expect(screen.getByRole('alert')).toHaveTextContent('파일을 첨부해주세요');
      expect(screen.getByRole('button', { name: '첨부 서류' }))
        .toHaveAttribute('aria-describedby', 'file-upload-document-error');
    });
  });

  context('when no error is given', () => {
    it('does not render error message', () => {
      render((
        <FileUpload
          name="document"
          files={[]}
          label="첨부 서류"
          onChangeFiles={handleChangeFiles}
        />
      ));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: '첨부 서류' })).not.toHaveAttribute('aria-describedby');
    });
  });

  context('when disabled', () => {
    it('disables trigger, input and delete buttons', () => {
      const { container } = render((
        <FileUpload
          name="document"
          files={[createFile('report.pdf')]}
          type="button"
          disabled
          onChangeFiles={handleChangeFiles}
        />
      ));

      expect(screen.getByRole('button', { name: '파일 첨부' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'report.pdf 삭제' })).toBeDisabled();
      expect(getHiddenInput(container)).toBeDisabled();
    });

    it('takes dropzone out of tab order', () => {
      render((
        <FileUpload
          name="document"
          files={[]}
          label="첨부 서류"
          disabled
          onChangeFiles={handleChangeFiles}
        />
      ));

      const dropzone = screen.getByRole('button', { name: '첨부 서류' });

      expect(dropzone).toHaveAttribute('aria-disabled', 'true');
      expect(dropzone).not.toHaveAttribute('tabindex');
    });
  });
});
