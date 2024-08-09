import { useEffect, useState } from "react";
import authImg from "../../assets/images/auth.webp";
import useForm from "../../hooks/useForm";
import { doLogin, doRegister } from "../../utilis/apiCalls";
import { validate } from "../../utilis/main";
import { BiLoaderCircle } from "react-icons/bi";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [tab, setTab] = useState<string>("Login");
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData,setFormData, errors, setErrors, handleChange, handleSubmit } = useForm({
    initialValues: { name: "", email: "", password: "", confirm_password: "" },
    validate,
    onSubmit: async(values) => {
      const url = tab === "Login" ? "/auth/signin" : "/auth/signup";
      if (tab === "Login") {
       await doLogin(values, url,dispatch,navigate);
      } else {
        setLoader(true);
       await doRegister(values, url);
        setFormData({name:"",email:"",password:"",confirm_password:""});
        setLoader(false);
        setTab("Login");
      }
    },
    tab,
  });

  useEffect(() => {
    setErrors({});
  }, [tab]);

  const { loading } = useAppSelector((data) => data.user);

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/*img box*/}

          <div className="hidden lg:block bg-primaryColor">
            <figure className="rounded-l-lg">
              <img
                src={authImg}
                alt="authImage"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>

          {/*form*/}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[2.2rem] leading-9 font-bold mb-10">
              {tab === "Register" ? (
                <>
                  Create an <span className="text-primaryColor">account</span>
                </>
              ) : (
                <>
                  Sign <span className="text-primaryColor">In</span>
                </>
              )}
            </h3>

            <form noValidate onSubmit={handleSubmit}>
              {tab === "Register" && (
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Enter you full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form_input"
                  />
                  {errors.name && <p className="text-red-400">{errors.name}</p>}
                </div>
              )}
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form_input"
                />
                {errors.email && <p className="text-red-400">{errors.email}</p>}
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter you password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form_input"
                />
                {errors.password && (
                  <p className="text-red-400">{errors.password}</p>
                )}
              </div>
              {tab === "Register" && (
                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="Enter your password again"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="form_input"
                  />
                  {errors.confirm_password && (
                    <p className="text-red-400">{errors.confirm_password}</p>
                  )}
                </div>
              )}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[1.8rem] leading-[30px] rounded-lg px-4 py-3"
                >
                  {tab === "Register" ? (
                    <>{loader ? <BiLoaderCircle size={35} color="black"/> : "Sign Up"}</>
                  ) : (
                    <>{loading ? <BiLoaderCircle size={35} color="black"/> : "Sign In"}</>
                  )}
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                {tab === "Register" ? (
                  <>
                    Already have an account?{" "}
                    <button className="hover:text-primaryColor"
                      onClick={(e) => {
                        e.preventDefault(), setTab("Login") ,setFormData({name:"",email:"",password:"",confirm_password:""});
                      }}
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Create an account?{" "}
                    <button className="hover:text-primaryColor"
                      onClick={(e) => {
                        e.preventDefault(), setTab("Register") , setFormData({name:"",email:"",password:"",confirm_password:""});
                      }}
                    >
                      Register
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
