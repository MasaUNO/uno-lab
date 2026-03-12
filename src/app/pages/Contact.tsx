import { Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl mb-12">Contact</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl mb-6">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            お問い合わせは以下のフォームまたは直接メールでご連絡ください。
            研究室訪問も歓迎します。
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-700">
                  Uno Laboratory<br />
                  Department of Earth and Planetary Science<br />
                  Graduate School of Science<br />
                  The University of Tokyo<br />
                  7-3-1 Hongo, Bunkyo-ku<br />
                  Tokyo 113-0033, Japan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-700">
                  contact@unolab.u-tokyo.ac.jp<br />
                  uno@eps.s.u-tokyo.ac.jp
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Office Hours</h3>
            <p className="text-gray-700">
              月曜日 - 金曜日: 9:00 - 17:00<br />
              土日祝日: 休業<br />
              <span className="text-sm text-gray-600">
                ※訪問の際は事前にメールでご連絡ください
              </span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-6">Contact Form</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">
                Name / 氏名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="affiliation" className="block mb-2">
                Affiliation / 所属
              </label>
              <input
                type="text"
                id="affiliation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2">
                Subject / 件名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2">
                Message / メッセージ <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>

            <p className="text-sm text-gray-600">
              ※このフォームはデモ版です。実際の送信機能を実装する場合は、
              バックエンドAPIとの連携が必要です。
            </p>
          </form>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-12">
        <h2 className="text-2xl mb-6">Location</h2>
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">
            Google Maps integration would go here
          </p>
        </div>
      </div>
    </div>
  );
}