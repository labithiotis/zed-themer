/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type AppearanceContent = 'light' | 'dark';
export type FontStyleContent = 'normal' | 'italic' | 'oblique';

/**
 * The content of a serialized theme family.
 */
export interface ThemeFamilyContent {
  author: string;
  name: string;
  themes: ThemeContent[];
}
/**
 * The content of a serialized theme.
 */
export interface ThemeContent {
  appearance: AppearanceContent;
  name: string;
  style: ThemeStyleContent;
}
/**
 * The content of a serialized theme.
 */
export interface ThemeStyleContent {
  /**
   * Background Color. Used for the app background and blank panels or windows.
   */
  background?: string | null;
  /**
   * Set appearance for background, if transparent or blurred background color needs to be an alpha.
   */
  'background.appearance'?: ('opaque' | 'transparent' | 'blurred') | null;
  /**
   * Border color. Used for most borders, is usually a high contrast color.
   */
  border?: string | null;
  /**
   * Border color. Used for disabled elements, like a disabled input or button.
   */
  'border.disabled'?: string | null;
  /**
   * Border color. Used for focused elements, like keyboard focused list item.
   */
  'border.focused'?: string | null;
  /**
   * Border color. Used for selected elements, like an active search filter or selected checkbox.
   */
  'border.selected'?: string | null;
  /**
   * Border color. Used for transparent borders. Used for placeholder borders when an element gains a border on state change.
   */
  'border.transparent'?: string | null;
  /**
   * Border color. Used for deemphasized borders, like a visual divider between two sections
   */
  'border.variant'?: string | null;
  /**
   * Indicates some kind of conflict, like a file changed on disk while it was open, or merge conflicts in a Git repository.
   */
  conflict?: string | null;
  'conflict.background'?: string | null;
  'conflict.border'?: string | null;
  /**
   * Indicates something new, like a new file added to a Git repository.
   */
  created?: string | null;
  'created.background'?: string | null;
  'created.border'?: string | null;
  /**
   * Indicates that something no longer exists, like a deleted file.
   */
  deleted?: string | null;
  'deleted.background'?: string | null;
  'deleted.border'?: string | null;
  /**
   * Background Color. Used for the area that shows where a dragged element will be dropped.
   */
  'drop_target.background'?: string | null;
  'editor.active_line.background'?: string | null;
  /**
   * Text Color. Used for the text of the line number in the editor gutter when the line is highlighted.
   */
  'editor.active_line_number'?: string | null;
  'editor.active_wrap_guide'?: string | null;
  'editor.background'?: string | null;
  /**
   * Read-access of a symbol, like reading a variable. A document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.
   */
  'editor.document_highlight.read_background'?: string | null;
  /**
   * Read-access of a symbol, like reading a variable. A document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.
   */
  'editor.document_highlight.write_background'?: string | null;
  'editor.foreground'?: string | null;
  'editor.gutter.background'?: string | null;
  'editor.highlighted_line.background'?: string | null;
  /**
   * Text Color. Used to mark invisible characters in the editor. Example: spaces, tabs, carriage returns, etc.
   */
  'editor.invisible'?: string | null;
  /**
   * Text Color. Used for the text of the line number in the editor gutter.
   */
  'editor.line_number'?: string | null;
  'editor.subheader.background'?: string | null;
  'editor.wrap_guide'?: string | null;
  /**
   * Background Color. Used for the active state of an element that should have a different background than the surface it's on. Active states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.
   */
  'element.active'?: string | null;
  /**
   * Background Color. Used for the background of an element that should have a different background than the surface it's on. Elements might include: Buttons, Inputs, Checkboxes, Radio Buttons... For an element that should have the same background as the surface it's on, use `ghost_element_background`.
   */
  'element.background'?: string | null;
  /**
   * Background Color. Used for the disabled state of an element that should have a different background than the surface it's on. Disabled states are shown when a user cannot interact with an element, like a disabled button or input.
   */
  'element.disabled'?: string | null;
  /**
   * Background Color. Used for the hover state of an element that should have a different background than the surface it's on. Hover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.
   */
  'element.hover'?: string | null;
  /**
   * Background Color. Used for the selected state of an element that should have a different background than the surface it's on. Selected states are triggered by the element being selected (or 'activated') by the user. This could include a selected checkbox, a toggleable button that is toggled on, etc.
   */
  'element.selected'?: string | null;
  /**
   * Border color. Used for elevated surfaces, like a context menu, popup, or dialog.
   */
  'elevated_surface.background'?: string | null;
  /**
   * Indicates a system error, a failed operation or a diagnostic error.
   */
  error?: string | null;
  'error.background'?: string | null;
  'error.border'?: string | null;
  /**
   * Background Color. Used for the active state of a ghost element that should have the same background as the surface it's on. Active states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.
   */
  'ghost_element.active'?: string | null;
  /**
   * Used for the background of a ghost element that should have the same background as the surface it's on. Elements might include: Buttons, Inputs, Checkboxes, Radio Buttons... For an element that should have a different background than the surface it's on, use `element_background`.
   */
  'ghost_element.background'?: string | null;
  /**
   * Background Color. Used for the disabled state of a ghost element that should have the same background as the surface it's on. Disabled states are shown when a user cannot interact with an element, like a disabled button or input.
   */
  'ghost_element.disabled'?: string | null;
  /**
   * Background Color. Used for the hover state of a ghost element that should have the same background as the surface it's on. Hover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.
   */
  'ghost_element.hover'?: string | null;
  /**
   * Background Color. Used for the selected state of a ghost element that should have the same background as the surface it's on. Selected states are triggered by the element being selected (or 'activated') by the user. This could include a selected checkbox, a toggleable button that is toggled on, etc.
   */
  'ghost_element.selected'?: string | null;
  /**
   * Represents a hidden status, such as a file being hidden in a file tree.
   */
  hidden?: string | null;
  'hidden.background'?: string | null;
  'hidden.border'?: string | null;
  /**
   * Indicates a hint or some kind of additional information.
   */
  hint?: string | null;
  'hint.background'?: string | null;
  'hint.border'?: string | null;
  /**
   * Fill Color. Used for the default fill color of an icon.
   */
  icon?: string | null;
  /**
   * Fill Color. Used for the accent fill color of an icon. This might be used to show when a toggleable icon button is selected.
   */
  'icon.accent'?: string | null;
  /**
   * Fill Color. Used for the disabled fill color of an icon. Disabled states are shown when a user cannot interact with an element, like a icon button.
   */
  'icon.disabled'?: string | null;
  /**
   * Fill Color. Used for the muted or deemphasized fill color of an icon. This might be used to show an icon in an inactive pane, or to demphasize a series of icons to give them less visual weight.
   */
  'icon.muted'?: string | null;
  /**
   * Fill Color. Used for the placeholder fill color of an icon. This might be used to show an icon in an input that disappears when the user enters text.
   */
  'icon.placeholder'?: string | null;
  /**
   * Indicates that something is deliberately ignored, such as a file or operation ignored by Git.
   */
  ignored?: string | null;
  'ignored.background'?: string | null;
  'ignored.border'?: string | null;
  /**
   * Represents informational status updates or messages.
   */
  info?: string | null;
  'info.background'?: string | null;
  'info.border'?: string | null;
  'link_text.hover'?: string | null;
  /**
   * Indicates a changed or altered status, like a file that has been edited.
   */
  modified?: string | null;
  'modified.background'?: string | null;
  'modified.border'?: string | null;
  'pane.focused_border'?: string | null;
  'panel.background'?: string | null;
  'panel.focused_border'?: string | null;
  players?: PlayerColorContent[];
  /**
   * Indicates something that is predicted, like automatic code completion, or generated code.
   */
  predictive?: string | null;
  'predictive.background'?: string | null;
  'predictive.border'?: string | null;
  /**
   * Represents a renamed status, such as a file that has been renamed.
   */
  renamed?: string | null;
  'renamed.background'?: string | null;
  'renamed.border'?: string | null;
  /**
   * The border color of the scrollbar thumb.
   */
  'scrollbar.thumb.border'?: string | null;
  /**
   * The color of the scrollbar thumb when hovered over.
   */
  'scrollbar.thumb.hover_background'?: string | null;
  /**
   * The background color of the scrollbar track.
   */
  'scrollbar.track.background'?: string | null;
  /**
   * The border color of the scrollbar track.
   */
  'scrollbar.track.border'?: string | null;
  /**
   * The color of the scrollbar thumb.
   */
  'scrollbar_thumb.background'?: string | null;
  'search.match_background'?: string | null;
  'status_bar.background'?: string | null;
  'status_bar.foreground'?: string | null;
  /**
   * Indicates a successful operation or task completion.
   */
  success?: string | null;
  'success.background'?: string | null;
  'success.border'?: string | null;
  /**
   * Background Color. Used for grounded surfaces like a panel or tab.
   */
  'surface.background'?: string | null;
  /**
   * The styles for syntax nodes.
   */
  syntax?: {
    [k: string]: HighlightStyleContent;
  };
  'tab.active_background'?: string | null;
  'tab.active_foreground'?: string | null;
  'tab.inactive_background'?: string | null;
  'tab_bar.background'?: string | null;
  /**
   * Amber ANSI terminal color.
   */
  'terminal.ansi.amber'?: string | null;
  /**
   * Black ANSI terminal color.
   */
  'terminal.ansi.black'?: string | null;
  /**
   * Blue ANSI terminal color.
   */
  'terminal.ansi.blue'?: string | null;
  /**
   * Bright black ANSI terminal color.
   */
  'terminal.ansi.bright_black'?: string | null;
  /**
   * Bright blue ANSI terminal color.
   */
  'terminal.ansi.bright_blue'?: string | null;
  /**
   * Bright cyan ANSI terminal color.
   */
  'terminal.ansi.bright_cyan'?: string | null;
  /**
   * Bright green ANSI terminal color.
   */
  'terminal.ansi.bright_green'?: string | null;
  /**
   * Bright magenta ANSI terminal color.
   */
  'terminal.ansi.bright_magenta'?: string | null;
  /**
   * Bright red ANSI terminal color.
   */
  'terminal.ansi.bright_red'?: string | null;
  /**
   * Bright white ANSI terminal color.
   */
  'terminal.ansi.bright_white'?: string | null;
  /**
   * Bright yellow ANSI terminal color.
   */
  'terminal.ansi.bright_yellow'?: string | null;
  /**
   * Cyan ANSI terminal color.
   */
  'terminal.ansi.cyan'?: string | null;
  /**
   * Dim black ANSI terminal color.
   */
  'terminal.ansi.dim_black'?: string | null;
  /**
   * Dim blue ANSI terminal color.
   */
  'terminal.ansi.dim_blue'?: string | null;
  /**
   * Dim cyan ANSI terminal color.
   */
  'terminal.ansi.dim_cyan'?: string | null;
  /**
   * Dim green ANSI terminal color.
   */
  'terminal.ansi.dim_green'?: string | null;
  /**
   * Dim magenta ANSI terminal color.
   */
  'terminal.ansi.dim_magenta'?: string | null;
  /**
   * Dim red ANSI terminal color.
   */
  'terminal.ansi.dim_red'?: string | null;
  /**
   * Dim white ANSI terminal color.
   */
  'terminal.ansi.dim_white'?: string | null;
  /**
   * Dim yellow ANSI terminal color.
   */
  'terminal.ansi.dim_yellow'?: string | null;
  /**
   * Green ANSI terminal color.
   */
  'terminal.ansi.green'?: string | null;
  /**
   * Magenta ANSI terminal color.
   */
  'terminal.ansi.magenta'?: string | null;
  /**
   * Red ANSI terminal color.
   */
  'terminal.ansi.red'?: string | null;
  /**
   * White ANSI terminal color.
   */
  'terminal.ansi.white'?: string | null;
  /**
   * Yellow ANSI terminal color.
   */
  'terminal.ansi.yellow'?: string | null;
  /**
   * Terminal background color.
   */
  'terminal.background'?: string | null;
  /**
   * Bright terminal foreground color.
   */
  'terminal.bright_foreground'?: string | null;
  /**
   * Dim terminal foreground color.
   */
  'terminal.dim_foreground'?: string | null;
  /**
   * Terminal foreground color.
   */
  'terminal.foreground'?: string | null;
  /**
   * Text Color. Default text color used for most text.
   */
  text?: string | null;
  /**
   * Text Color. Color used for emphasis or highlighting certain text, like an active filter or a matched character in a search.
   */
  'text.accent'?: string | null;
  /**
   * Text Color. Color used for text denoting disabled elements. Typically, the color is faded or grayed out to emphasize the disabled state.
   */
  'text.disabled'?: string | null;
  /**
   * Text Color. Color of muted or deemphasized text. It is a subdued version of the standard text color.
   */
  'text.muted'?: string | null;
  /**
   * Text Color. Color of the placeholder text typically shown in input fields to guide the user to enter valid data.
   */
  'text.placeholder'?: string | null;
  'title_bar.background'?: string | null;
  'toolbar.background'?: string | null;
  /**
   * Indicates some kind of unreachable status, like a block of code that can never be reached.
   */
  unreachable?: string | null;
  'unreachable.background'?: string | null;
  'unreachable.border'?: string | null;
  /**
   * Represents a warning status, like an operation that is about to fail.
   */
  warning?: string | null;
  'warning.background'?: string | null;
  'warning.border'?: string | null;
}
export interface PlayerColorContent {
  background?: string | null;
  cursor?: string | null;
  selection?: string | null;
}
export interface HighlightStyleContent {
  color: string | null;
  font_style: FontStyleContent | null;
  font_weight: (100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900) | null;
}
