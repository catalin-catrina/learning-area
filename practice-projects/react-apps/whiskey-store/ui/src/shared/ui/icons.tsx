// Every icon in the app comes from this one file. They are Material Design
// icons from react-icons (https://react-icons.github.io/react-icons/icons/md/).
//
// To swap an icon: find a new one on that page (search, click, copy its name)
// and change the import below. To add one: import it and export it under a
// name that says what it's FOR (CartAddIcon), not what it looks like, so the
// rest of the app never imports react-icons directly.
//
// They draw in `currentColor` (they take the text color of their parent) and
// size from `className` ("size-4"), or from a parent's `[&_svg]:size-5`.
// Without either they are 1em, the parent's font size.
import type { IconBaseProps, IconType } from "react-icons";
import {
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdCheck,
  MdCheckCircleOutline,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdErrorOutline,
  MdExpandMore,
  MdFavorite,
  MdFavoriteBorder,
  MdLockOutline,
  MdLogout,
  MdMenu,
  MdOutlineAddShoppingCart,
  MdOutlineCardGiftcard,
  MdOutlineDarkMode,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineInventory2,
  MdOutlineLightMode,
  MdOutlineLiquor,
  MdOutlineLocalOffer,
  MdOutlineLocalShipping,
  MdOutlinePlace,
  MdOutlineRateReview,
  MdOutlineShoppingBag,
  MdOutlineVerifiedUser,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdPersonOutline,
  MdRemove,
  MdSearch,
  MdStar,
  MdStarBorder,
  MdTune,
} from "react-icons/md";

export type IconProps = IconBaseProps;

// Icons next to text are decoration: screen readers should skip them (the
// button or link around them carries the label). `aria-hidden` does that.
function decorative(Icon: IconType) {
  const Wrapped = (props: IconProps) => <Icon aria-hidden="true" focusable="false" {...props} />;
  Wrapped.displayName = Icon.name;
  return Wrapped;
}

// Two shapes for one meaning (outline vs filled), picked with `filled`.
function toggled(Off: IconType, On: IconType) {
  const Wrapped = ({ filled = false, ...props }: IconProps & { filled?: boolean }) => {
    const Icon = filled ? On : Off;
    return <Icon aria-hidden="true" focusable="false" {...props} />;
  };
  return Wrapped;
}

// Controls
export const CheckIcon = decorative(MdCheck);
export const MinusIcon = decorative(MdRemove);
export const PlusIcon = decorative(MdAdd);
export const CloseIcon = decorative(MdClose);
export const MenuIcon = decorative(MdMenu);
export const SearchIcon = decorative(MdSearch);
export const SlidersIcon = decorative(MdTune);
export const ChevronDownIcon = decorative(MdExpandMore);
export const ChevronLeftIcon = decorative(MdChevronLeft);
export const ChevronRightIcon = decorative(MdChevronRight);
export const ArrowLeftIcon = decorative(MdArrowBack);
export const ArrowRightIcon = decorative(MdArrowForward);
export const EyeIcon = decorative(MdOutlineVisibility);
export const EyeOffIcon = decorative(MdOutlineVisibilityOff);
export const PencilIcon = decorative(MdOutlineEdit);
export const TrashIcon = decorative(MdOutlineDelete);

// Status
export const AlertIcon = decorative(MdErrorOutline);
export const CheckCircleIcon = decorative(MdCheckCircleOutline);

// Shop
export const BagIcon = decorative(MdOutlineShoppingBag);
export const CartAddIcon = decorative(MdOutlineAddShoppingCart);
export const GiftIcon = decorative(MdOutlineCardGiftcard);
export const OfferIcon = decorative(MdOutlineLocalOffer);
export const BottleIcon = decorative(MdOutlineLiquor);
export const ReviewIcon = decorative(MdOutlineRateReview);
export const HeartIcon = toggled(MdFavoriteBorder, MdFavorite);
export const StarIcon = toggled(MdStarBorder, MdStar);

// Delivery, account, trust
export const TruckIcon = decorative(MdOutlineLocalShipping);
export const PackageIcon = decorative(MdOutlineInventory2);
export const MapPinIcon = decorative(MdOutlinePlace);
export const ShieldIcon = decorative(MdOutlineVerifiedUser);
export const LockIcon = decorative(MdLockOutline);
export const UserIcon = decorative(MdPersonOutline);
export const LogOutIcon = decorative(MdLogout);

// Theme
export const MoonIcon = decorative(MdOutlineDarkMode);
export const SunIcon = decorative(MdOutlineLightMode);
