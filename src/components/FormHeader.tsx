interface IFormHeader {
    title: string;
    subtitle: string;
  }
  const FormHeader = ({ title, subtitle }: IFormHeader) => {
    return (
      <div>
        <h2 className='text-[2.4rem] font-bold mb-4'>{title}</h2>
        <p>{subtitle}</p>
      </div>
    );
  };
  
  export default FormHeader;