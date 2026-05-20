'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { useEffect, useCallback, useState } from 'react';

export interface EditorStats {
  words: number;
  characters: number;
  paragraphs: number;
  headings: number;
  readingTime: number;
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onStatsChange?: (stats: EditorStats) => void;
  placeholder?: string;
  minHeight?: number;
}

const TEXT_COLORS = [
  { label: 'Default', value: '' },
  { label: 'Navy', value: '#1e3a5f' },
  { label: 'Red', value: '#dc3545' },
  { label: 'Green', value: '#198754' },
  { label: 'Blue', value: '#0d6efd' },
  { label: 'Orange', value: '#fd7e14' },
  { label: 'Purple', value: '#6f42c1' },
  { label: 'Gray', value: '#6c757d' },
];

const HIGHLIGHT_COLORS = [
  { label: 'Yellow', value: '#fff3cd' },
  { label: 'Green', value: '#d1e7dd' },
  { label: 'Blue', value: '#cfe2ff' },
  { label: 'Red', value: '#f8d7da' },
  { label: 'Purple', value: '#e2d9f3' },
];

function computeStats(html: string, words: number, characters: number): EditorStats {
  const paragraphs = (html.match(/<p[^>]*>/g) || []).length;
  const headings = (html.match(/<h[1-6][^>]*>/g) || []).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, characters, paragraphs, headings, readingTime };
}

export default function RichTextEditor({
  value,
  onChange,
  onStatsChange,
  placeholder = 'Start writing your blog post… (type / for commands)',
  minHeight = 420,
}: RichTextEditorProps) {
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [highlightMenuOpen, setHighlightMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // use basic code block from StarterKit
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
      TiptapImage.configure({ allowBase64: true }),
      CharacterCount,
      Placeholder.configure({ placeholder }),
      Youtube.configure({ width: 640, height: 360 }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    onUpdate({ editor: ed }) {
      const html = ed.getHTML();
      onChange(html);
      if (onStatsChange) {
        const words = ed.storage.characterCount.words() as number;
        const characters = ed.storage.characterCount.characters() as number;
        onStatsChange(computeStats(html, words, characters));
      }
    },
    editorProps: {
      attributes: {
        class: 'tiptap-content',
        spellcheck: 'true',
      },
    },
  });

  // Sync external value changes (e.g. loading saved draft)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && value !== '<p></p>') {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    setLinkUrl('');
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor || !imageUrl.trim()) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl('');
    setShowImageInput(false);
  }, [editor, imageUrl]);

  const addYoutube = useCallback(() => {
    if (!editor || !youtubeUrl.trim()) return;
    editor.commands.setYoutubeVideo({ src: youtubeUrl });
    setYoutubeUrl('');
    setShowYoutubeInput(false);
  }, [editor, youtubeUrl]);

  const insertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  const toolbarBtn = (active: boolean) =>
    `btn btn-sm toolbar-btn${active ? ' is-active' : ''}`;

  return (
    <>
      <style jsx global>{`
        .tiptap-wrapper {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          transition: border-color 0.15s;
        }
        .tiptap-wrapper:focus-within {
          border-color: #1e3a5f;
          box-shadow: 0 0 0 3px rgba(30,58,95,0.1);
        }
        .tiptap-wrapper.fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          border-radius: 0;
          display: flex;
          flex-direction: column;
        }
        .tiptap-wrapper.fullscreen .tiptap-scroll {
          flex: 1;
          overflow-y: auto;
        }
        .tiptap-toolbar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          padding: 6px 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
          align-items: center;
        }
        .tiptap-toolbar .btn-group + .btn-group { margin-left: 4px; }
        .toolbar-sep { width: 1px; height: 24px; background: #dee2e6; margin: 0 4px; }
        .toolbar-btn {
          width: 30px;
          height: 28px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px !important;
          border: 1px solid transparent;
          background: transparent;
          color: #495057;
          font-size: 0.82rem;
          transition: all 0.1s;
          cursor: pointer;
        }
        .toolbar-btn:hover { background: #e9ecef; color: #212529; border-color: #dee2e6; }
        .toolbar-btn.is-active { background: #1e3a5f; color: #fff; border-color: #1e3a5f; }
        .toolbar-btn.is-active:hover { background: #162d4a; }
        .toolbar-btn-wide { width: auto; padding: 0 8px; font-size: 0.78rem; font-weight: 600; }
        .tiptap-scroll { overflow-y: auto; }
        .tiptap-content {
          min-height: ${minHeight}px;
          padding: 20px 24px;
          outline: none;
          font-size: 1rem;
          line-height: 1.7;
          color: #212529;
        }
        .tiptap-content p { margin-bottom: 0.875em; }
        .tiptap-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #adb5bd;
          pointer-events: none;
          float: left;
          height: 0;
        }
        .tiptap-content h1 { font-size: 2rem; font-weight: 700; margin: 1.2em 0 0.5em; color: #1e3a5f; line-height: 1.2; }
        .tiptap-content h2 { font-size: 1.55rem; font-weight: 700; margin: 1.1em 0 0.45em; color: #1e3a5f; line-height: 1.25; }
        .tiptap-content h3 { font-size: 1.3rem; font-weight: 600; margin: 1em 0 0.4em; color: #1e3a5f; }
        .tiptap-content h4 { font-size: 1.1rem; font-weight: 600; margin: 0.9em 0 0.35em; }
        .tiptap-content h5 { font-size: 1rem; font-weight: 600; margin: 0.8em 0 0.3em; }
        .tiptap-content h6 { font-size: 0.9rem; font-weight: 600; margin: 0.7em 0 0.25em; }
        .tiptap-content h1:first-child, .tiptap-content h2:first-child, .tiptap-content h3:first-child { margin-top: 0; }
        .tiptap-content blockquote {
          border-left: 4px solid #1e3a5f;
          margin: 1em 0;
          padding: 0.5em 1em;
          background: #f0f4f8;
          border-radius: 0 6px 6px 0;
          font-style: italic;
          color: #495057;
        }
        .tiptap-content code {
          background: #f0f0f0;
          border-radius: 4px;
          padding: 2px 6px;
          font-family: 'Courier New', monospace;
          font-size: 0.88em;
          color: #d63384;
        }
        .tiptap-content pre {
          background: #1e2430;
          color: #e9ecef;
          border-radius: 8px;
          padding: 1em 1.2em;
          overflow-x: auto;
          margin: 1em 0;
        }
        .tiptap-content pre code { background: none; color: inherit; padding: 0; font-size: 0.875em; }
        .tiptap-content ul, .tiptap-content ol { padding-left: 1.6em; margin-bottom: 0.875em; }
        .tiptap-content li { margin-bottom: 0.25em; }
        .tiptap-content ul[data-type="taskList"] { padding-left: 0; list-style: none; }
        .tiptap-content ul[data-type="taskList"] li { display: flex; gap: 8px; align-items: flex-start; }
        .tiptap-content ul[data-type="taskList"] li > label { margin-top: 3px; flex-shrink: 0; }
        .tiptap-content ul[data-type="taskList"] li > div { flex: 1; }
        .tiptap-content img { max-width: 100%; border-radius: 8px; margin: 0.5em 0; }
        .tiptap-content hr { border: none; border-top: 2px solid #dee2e6; margin: 1.5em 0; }
        .tiptap-content a { color: #1e3a5f; text-decoration: underline; }
        .tiptap-content a:hover { color: #0d2137; }
        .tiptap-content table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        .tiptap-content td, .tiptap-content th { border: 1px solid #dee2e6; padding: 8px 12px; }
        .tiptap-content th { background: #f8f9fa; font-weight: 600; }
        .tiptap-content .youtube-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin: 1em 0; }
        .tiptap-content .youtube-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .color-swatch { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #dee2e6; cursor: pointer; display: inline-block; transition: transform 0.1s; }
        .color-swatch:hover { transform: scale(1.2); border-color: #adb5bd; }
        .color-dropdown { position: absolute; top: calc(100% + 4px); left: 0; z-index: 100; background: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); display: flex; flex-wrap: wrap; gap: 6px; width: 160px; }
        .inline-input-bar { display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: #f0f4f8; border-bottom: 1px solid #dee2e6; }
        .inline-input-bar input { flex: 1; border: 1px solid #dee2e6; border-radius: 4px; padding: 4px 8px; font-size: 0.82rem; outline: none; }
        .inline-input-bar input:focus { border-color: #1e3a5f; }
        .tiptap-footer { background: #f8f9fa; border-top: 1px solid #dee2e6; padding: 5px 12px; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #6c757d; }
      `}</style>

      <div className={`tiptap-wrapper${isFullscreen ? ' fullscreen' : ''}`}>
        {/* Toolbar */}
        <div className="tiptap-toolbar">
          {/* History */}
          <div className="btn-group">
            <button className={toolbarBtn(false)} title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
              <i className="bi bi-arrow-counterclockwise" />
            </button>
            <button className={toolbarBtn(false)} title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
              <i className="bi bi-arrow-clockwise" />
            </button>
          </div>

          <div className="toolbar-sep" />

          {/* Heading level */}
          <div className="btn-group">
            <button className={`${toolbarBtn(!editor.isActive('heading'))} toolbar-btn-wide`} title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()}>
              ¶
            </button>
            {([1, 2, 3, 4] as const).map((level) => (
              <button key={level} className={`${toolbarBtn(editor.isActive('heading', { level }))} toolbar-btn-wide`} title={`Heading ${level}`}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
                H{level}
              </button>
            ))}
          </div>

          <div className="toolbar-sep" />

          {/* Text formatting */}
          <div className="btn-group">
            <button className={toolbarBtn(editor.isActive('bold'))} title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()}>
              <i className="bi bi-type-bold" />
            </button>
            <button className={toolbarBtn(editor.isActive('italic'))} title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()}>
              <i className="bi bi-type-italic" />
            </button>
            <button className={toolbarBtn(editor.isActive('underline'))} title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <i className="bi bi-type-underline" />
            </button>
            <button className={toolbarBtn(editor.isActive('strike'))} title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}>
              <i className="bi bi-type-strikethrough" />
            </button>
            <button className={toolbarBtn(editor.isActive('code'))} title="Inline code" onClick={() => editor.chain().focus().toggleCode().run()}>
              <i className="bi bi-code" />
            </button>
          </div>

          <div className="toolbar-sep" />

          {/* Text color */}
          <div className="btn-group" style={{ position: 'relative' }}>
            <button className={toolbarBtn(false)} title="Text color" onClick={() => { setColorMenuOpen((v) => !v); setHighlightMenuOpen(false); }}>
              <i className="bi bi-palette" />
            </button>
            {colorMenuOpen && (
              <div className="color-dropdown">
                {TEXT_COLORS.map((c) => (
                  <div key={c.value || 'default'} className="color-swatch" title={c.label}
                    style={{ background: c.value || '#212529', outline: editor.isActive('textStyle', { color: c.value }) ? '2px solid #1e3a5f' : 'none', outlineOffset: '2px' }}
                    onClick={() => { if (c.value) { editor.chain().focus().setColor(c.value).run(); } else { editor.chain().focus().unsetColor().run(); } setColorMenuOpen(false); }} />
                ))}
              </div>
            )}
          </div>

          {/* Highlight */}
          <div className="btn-group" style={{ position: 'relative' }}>
            <button className={toolbarBtn(editor.isActive('highlight'))} title="Highlight" onClick={() => { setHighlightMenuOpen((v) => !v); setColorMenuOpen(false); }}>
              <i className="bi bi-highlighter" />
            </button>
            {highlightMenuOpen && (
              <div className="color-dropdown">
                <div className="color-swatch" title="Remove highlight" style={{ background: 'linear-gradient(135deg, #fff 45%, #dc3545 55%)' }}
                  onClick={() => { editor.chain().focus().unsetHighlight().run(); setHighlightMenuOpen(false); }} />
                {HIGHLIGHT_COLORS.map((c) => (
                  <div key={c.value} className="color-swatch" title={c.label} style={{ background: c.value }}
                    onClick={() => { editor.chain().focus().setHighlight({ color: c.value }).run(); setHighlightMenuOpen(false); }} />
                ))}
              </div>
            )}
          </div>

          <div className="toolbar-sep" />

          {/* Alignment */}
          <div className="btn-group">
            {(['left', 'center', 'right', 'justify'] as const).map((align) => (
              <button key={align} className={toolbarBtn(editor.isActive({ textAlign: align }))} title={`Align ${align}`}
                onClick={() => editor.chain().focus().setTextAlign(align).run()}>
                <i className={`bi bi-text-${align === 'justify' ? 'justify' : align}`} />
              </button>
            ))}
          </div>

          <div className="toolbar-sep" />

          {/* Lists */}
          <div className="btn-group">
            <button className={toolbarBtn(editor.isActive('bulletList'))} title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <i className="bi bi-list-ul" />
            </button>
            <button className={toolbarBtn(editor.isActive('orderedList'))} title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <i className="bi bi-list-ol" />
            </button>
            <button className={toolbarBtn(editor.isActive('taskList'))} title="Task list" onClick={() => editor.chain().focus().toggleTaskList().run()}>
              <i className="bi bi-list-check" />
            </button>
          </div>

          <div className="toolbar-sep" />

          {/* Blocks */}
          <div className="btn-group">
            <button className={toolbarBtn(editor.isActive('blockquote'))} title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <i className="bi bi-chat-square-quote" />
            </button>
            <button className={toolbarBtn(editor.isActive('codeBlock'))} title="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
              <i className="bi bi-code-square" />
            </button>
            <button className={toolbarBtn(false)} title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <i className="bi bi-dash-lg" />
            </button>
          </div>

          <div className="toolbar-sep" />

          {/* Insert */}
          <div className="btn-group">
            <button className={toolbarBtn(editor.isActive('link'))} title="Insert link" onClick={() => { setShowLinkInput((v) => !v); setShowImageInput(false); setShowYoutubeInput(false); }}>
              <i className="bi bi-link-45deg" />
            </button>
            <button className={toolbarBtn(false)} title="Insert image" onClick={() => { setShowImageInput((v) => !v); setShowLinkInput(false); setShowYoutubeInput(false); }}>
              <i className="bi bi-image" />
            </button>
            <button className={toolbarBtn(false)} title="Insert table" onClick={insertTable}>
              <i className="bi bi-table" />
            </button>
            <button className={toolbarBtn(false)} title="Embed YouTube video" onClick={() => { setShowYoutubeInput((v) => !v); setShowLinkInput(false); setShowImageInput(false); }}>
              <i className="bi bi-youtube" />
            </button>
          </div>

          {/* Spacer + fullscreen */}
          <div style={{ marginLeft: 'auto' }}>
            <button className={toolbarBtn(isFullscreen)} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen mode'} onClick={() => setIsFullscreen((v) => !v)}>
              <i className={`bi bi-${isFullscreen ? 'fullscreen-exit' : 'fullscreen'}`} />
            </button>
          </div>
        </div>

        {/* Inline input bars */}
        {showLinkInput && (
          <div className="inline-input-bar">
            <i className="bi bi-link-45deg text-muted" />
            <input type="url" placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLink()} autoFocus />
            <button className="btn btn-sm btn-primary" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} onClick={addLink}>Add</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowLinkInput(false)}>✕</button>
          </div>
        )}
        {showImageInput && (
          <div className="inline-input-bar">
            <i className="bi bi-image text-muted" />
            <input type="url" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addImage()} autoFocus />
            <button className="btn btn-sm btn-primary" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} onClick={addImage}>Insert</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowImageInput(false)}>✕</button>
          </div>
        )}
        {showYoutubeInput && (
          <div className="inline-input-bar">
            <i className="bi bi-youtube text-muted" />
            <input type="url" placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addYoutube()} autoFocus />
            <button className="btn btn-sm btn-primary" style={{ background: '#1e3a5f', borderColor: '#1e3a5f' }} onClick={addYoutube}>Embed</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowYoutubeInput(false)}>✕</button>
          </div>
        )}

        {/* Editor area */}
        <div className="tiptap-scroll">
          <EditorContent editor={editor} />
        </div>

        {/* Footer stats */}
        <div className="tiptap-footer">
          <span>
            {(editor.storage.characterCount.words() as number).toLocaleString()} words ·{' '}
            {(editor.storage.characterCount.characters() as number).toLocaleString()} characters
          </span>
          <span>~{Math.max(1, Math.ceil((editor.storage.characterCount.words() as number) / 200))} min read</span>
        </div>
      </div>
    </>
  );
}
