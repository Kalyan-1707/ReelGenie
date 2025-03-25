import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function that takes any number of class names,
 * Tailwind classnames, or objects with class names and returns
 * a single class name string after merging and deduplicating
 * the input.
 *
 * @param inputs - Any number of class names, Tailwind classnames,
 * objects with class names, or arrays of the above.
 *
 * @example
 * cn('bg-red-500', 'px-4 py-2') // => "bg-red-500 px-4 py-2"
 * cn('bg-red-500', { 'px-4 py-2': props.isActive }) // => "bg-red-500"
 * cn('bg-red-500', ['px-4', { 'py-2': props.isActive }]) // => "bg-red-500 px-4"
 * cn('bg-red-500', ['px-4', { 'py-2': props.isActive }, 'text-white']) // => "bg-red-500 px-4 text-white"
 *
 * @see https://github.com/JoshComeau/tw-merge
 * @see https://github.com/lukeed/clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
