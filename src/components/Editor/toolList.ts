import {
  Bold,
  Italic,
  Code,
  Quote,
  Heading,
  List,
  ListOrdered,
  Zap,
  Link,
  ImagePlus,
  Command,
} from 'lucide-react';

function getTools() {
  const isMacOS =
    typeof window !== 'undefined' &&
    window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const tools = [
    {
      name: 'bold',
      shortcut: isMacOS ? 'cmd + b' : 'ctrl + b',
      iconName: Bold,
    },
    {
      name: 'italic',
      shortcut: isMacOS ? 'cmd + i' : 'ctrl + i',
      iconName: Italic,
    },
    {
      name: 'heading',
      shortcut: isMacOS ? 'cmd + h' : 'ctrl + h',
      iconName: Heading,
    },
    {
      name: 'Ordered List',
      shortcut: isMacOS ? 'cmd + o' : 'ctrl + o',
      iconName: List,
    },
    {
      name: 'Unordered List',
      shortcut: isMacOS ? 'cmd + u' : 'ctrl + u',
      iconName: ListOrdered,
    },
    {
      name: 'code',
      shortcut: isMacOS ? 'cmd + b' : 'ctrl + b',
      iconName: Code,
    },
    {
      name: 'embed',
      shortcut: isMacOS ? 'cmd + b' : 'ctrl + b',
      iconName: Zap,
    },
    {
      name: 'link',
      shortcut: isMacOS ? 'cmd + b' : 'ctrl + b',
      iconName: Link,
    },
    {
      name: 'quote',
      shortcut: isMacOS ? 'cmd + b' : 'ctrl + b',
      iconName: Quote,
    },
  ];

  return tools;
}

export const tools = getTools();
