const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl ml-2 text-white font-bold tracking-tight">
          Holiday.com
        </span>
        <span className="text-white md:flex md:flex-row flex-col  font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer ml-2">Privacy Policy</p>
          <p className="cursor-pointer mr-3">Terms condition</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
