## Fixed Generate Script Button Issue

The button was not working due to malformed JSX syntax in the Prompt.tsx file:

1. The Button component had incorrect syntax for the disabled prop
2. The className string was broken across multiple lines incorrectly
3. The Textarea component had a duplicate className string

These issues have been fixed by:
1. Properly formatting the Button component props
2. Fixing the className string to be on a single line
3. Removing the duplicate className content

The button should now work as expected.