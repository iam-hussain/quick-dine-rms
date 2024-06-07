import React from "react";
import { BiRestaurant } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { BsPrinterFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFastForwardCircleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaRegObjectGroup } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { FaConciergeBell } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
import { FaBowlFood } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaTruckField } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { FiPrinter } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { GiCampCookingPot } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { HiMenu } from "react-icons/hi";
import { HiMenuAlt1 } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoFastFoodSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoPrint } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoCaretDownOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoReload } from "react-icons/io5";
import { IoReloadCircleSharp } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { MdSoupKitchen } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { MdTableRestaurant } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdSummarize } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { MdBookOnline } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import { PiCookingPot } from "react-icons/pi";
import { PiCookingPotFill } from "react-icons/pi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { RiDraftFill } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEBike2Fill } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { SiAirtable } from "react-icons/si";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { TbDiscount2 } from "react-icons/tb";
import { TbMotorbike } from "react-icons/tb";
import { TfiPackage } from "react-icons/tfi";
import { TiUserAdd } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";
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
  RxLapTimer,
  FaClipboardCheck,
  FaTruckField,
  FaTruckLoading,
  BsFillCheckCircleFill,
  LuClipboardList,
  BsFastForwardCircleFill,
  TfiPackage,
  RiEBike2Fill,
  MdBookOnline,
  FaConciergeBell,
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
