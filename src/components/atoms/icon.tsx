import React from "react";
import { BiRestaurant } from "react-icons/bi";
import { IoRestaurantOutline } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { BsPrinterFill } from "react-icons/bs";
import { FaKitchenSet } from "react-icons/fa6";
import { SiAirtable } from "react-icons/si";
import { FaCartShopping } from "react-icons/fa6";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdSoupKitchen } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaTags } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { GiCookingPot } from "react-icons/gi";
import { HiMenu } from "react-icons/hi";
import { HiMenuAlt1 } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaStore } from "react-icons/fa6";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { TiUserAdd } from "react-icons/ti";
import { FaListUl } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { RiSubtractFill } from "react-icons/ri";
import { TbDiscount2 } from "react-icons/tb";
import { PiPackageFill } from "react-icons/pi";
import { TbMotorbike } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { PiCookingPot } from "react-icons/pi";
import { PiCookingPotFill } from "react-icons/pi";
import { MdOutlinePayments } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { GiCampCookingPot } from "react-icons/gi";
import { RiDraftFill } from "react-icons/ri";
import { MdSummarize } from "react-icons/md";
import { IoCaretDownOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdPending } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoReload } from "react-icons/io5";
import { IoReloadCircleSharp } from "react-icons/io5";
import { FaRegObjectGroup } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdCancelPresentation } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

const icons = {
  BiRestaurant,
  IoRestaurantOutline,
  FiPrinter,
  FaKitchenSet,
  FaStore,
  TbDeviceIpadMinus,
  FaCartShopping,
  RiAccountPinCircleFill,
  MdSoupKitchen,
  MdEventAvailable,
  IoFastFoodSharp,
  FaTags,
  IoLogOut,
  MdDashboard,
  SiAirtable,
  BsPrinterFill,
  GiCookingPot,
  HiMenu,
  HiMenuAlt1,
  HiMenuAlt2,
  MdFullscreen,
  MdFullscreenExit,
  IoClose,
  MdTableRestaurant,
  FiSearch,
  GrPowerReset,
  TiUserAdd,
  FaListUl,
  IoPersonAddSharp,
  IoMdAdd,
  TiDelete,
  RiSubtractFill,
  TbDiscount2,
  PiPackageFill,
  TbMotorbike,
  MdPendingActions,
  FaBowlFood,
  PiCookingPot,
  PiCookingPotFill,
  MdOutlinePayments,
  IoPrint,
  IoCart,
  FaUser,
  FaShoppingCart,
  MdAdd,
  IoIosArrowBack,
  FiEdit,
  MdDeleteOutline,
  MdOutlineEdit,
  BiShow,
  BiHide,
  FaSave,
  GiCampCookingPot,
  RiDraftFill,
  MdSummarize,
  IoCaretDownOutline,
  RiDeleteBinLine,
  MdPending,
  IoCheckmarkDoneCircle,
  IoReload,
  IoReloadCircleSharp,
  FaRegObjectGroup,
  MdOutlinePendingActions,
  FcCancel,
  MdCancelPresentation,
  TiCancel,
};

export type IconKey = keyof typeof icons;

export interface IconProps extends React.SVGAttributes<SVGAElement> {
  name: IconKey;
}

const Icon = ({ name, ...props }: IconProps) => {
  const IconComp = icons[name];
  return <IconComp {...props} />;
};

Icon.displayName = "Icon";

export default Icon;
