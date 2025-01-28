import React from 'react'

const Footer = () => {
  return (
<footer className="bg-black">
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
  

    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div className="text-center sm:text-left">
        <p className="text-lg font-medium text-white">About Us</p>

        <ul className="mt-8 space-y-4 text-sm">
          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#">
              Company History
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Meet the Team </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#">
              Employee Handbook
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Careers </a>
          </li>
        </ul>
      </div>

      <div className="text-center sm:text-left">
        <p className="text-lg font-medium text-white">Our Services</p>

        <ul className="mt-8 space-y-4 text-sm">
          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#">
              Web Development
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Web Design </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Marketing </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Google Ads </a>
          </li>
        </ul>
      </div>

      <div className="text-center sm:text-left">
        <p className="text-lg font-medium text-white">Resources</p>

        <ul className="mt-8 space-y-4 text-sm">
          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Online Guides </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#">
              Conference Notes
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Forum </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Downloads </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#">
              Upcoming Events
            </a>
          </li>
        </ul>
      </div>

      <div className="text-center sm:text-left">
        <p className="text-lg font-medium text-white">Helpful Links</p>

        <ul className="mt-8 space-y-4 text-sm">
          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> FAQs </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Support </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer
