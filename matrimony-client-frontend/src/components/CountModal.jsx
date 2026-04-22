import React, { useState, useEffect } from "react";
import { getUserCounts } from "../api/axiosService/userAuthService";

const CountModal = () => {
  const [counts, setCounts] = useState({
    total: 0,
    male: 0,
    female: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getUserCounts();

        if (res.data.success) {
          setCounts({
  total: res.data?.data?.totalUsers || 0,
  male: res.data?.data?.maleCount || 0,
  female: res.data?.data?.femaleCount || 0,
});
        }
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);
  return (
    <section className="py-4 my-2">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="bg-purple-50/80 p-10 md:p-16 rounded-[4rem] shadow-sm border border-purple-100">
          <div className="row">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full list-none p-0 m-0">
              <li>
                <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="bg-purple-100 p-4 rounded-full text-purple-600">
                    <i className="fa fa-heart-o text-4xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-extrabold text-gray-800">5</h4>
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Couples paired</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                    <i className="fa fa-users text-4xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-extrabold text-gray-800">
                      {counts.total}+
                    </h4>
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Registered users</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="bg-green-100 p-4 rounded-full text-green-600">
                    <i className="fa fa-male text-4xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-extrabold text-gray-800">
                      {counts.male}+
                    </h4>
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Groom</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <div className="bg-pink-100 p-4 rounded-full text-pink-600">
                    <i className="fa fa-female text-4xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-extrabold text-gray-800">
                      {counts.female}+
                    </h4>
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Bride</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountModal;