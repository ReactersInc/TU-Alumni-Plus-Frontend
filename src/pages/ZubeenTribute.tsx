import { motion } from "framer-motion";

const ZubeenTribute = () => {
  return (
    <div className="py-16 px-4 flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-200 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-4xl text-center bg-gray-500 p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-xl sm:text-xl mb-2  leading-relaxed font-[Noto_Serif_Assamese]">
          বিষ যেন শূণ্যতা! <br />
          অসম আৰু প্ৰতিজন অসমীয়া জুবিন বিহীন শূণ্যতাত…<br />
          সাগৰ তলিত শুই, মনৰ চিলা উৰুৱাই, অসমৰ হিয়া টানি আজুৰি লৈ গ'ল জুবিন।
        </h1>

        <p className="text-base sm:text-base text-white mb-2 leading-loose">
          In the land where the <strong>কপৌ ফুল</strong> blooms during{" "}
          <strong>ব’হাগ বিহু</strong>, where the <strong>ঢোল</strong> and{" "}
          <strong>পেঁপা</strong> echo across paddy fields, a voice that carried
          the soul of Assam to every corner of the world. That voice is none
          other than <strong>Zubeen Garg</strong> — the son of the soil, the
          eternal bard, the restless heart who turned life itself into music.
          <br />
          When he sings of love, it feels like the hush of a{" "}
          <strong>সুতুলি</strong> on a moonlit night. When he sings of pain, it
          is the cry of a riverbank breaking in floods. When he raises his voice
          in protest, it is the roar of a people refusing to be silenced. His
          art is more than entertainment — it is identity, it is memory, it is
          resistance.
          <br />
          <strong>Zubeen</strong> remains free, untamed, much like the spirit of
          Assam itself.
        </p>

        <blockquote className="text-lg text-gold sm:text-xl mb-2  leading-relaxed font-[Noto_Serif_Assamese] italic">
          মুগ্ধ হিয়া মোৰ কোনে ছুই যায়<br />
          মুগ্ধ হিয়াত ৰৈ কোনে চুমি যায়<br />
          বুকুতে অগনি জ্বলাই<br />
          তেজ—মঙহৰে মৰম নেওচি<br />
          জ্বলি জ্বলি ৰ'ল মাথোঁ ছাই !!
        </blockquote>

        <p className="text-xl sm:text-xl  leading-relaxed mb-2 font-[Noto_Serif_Assamese]">
          পঞ্চভূতত বিলীন আজি জুবিন , অজস্ৰ অনুৰাগীক কান্দোৱাই গ'ল গৈ জোনবাইৰ দেশলৈ…<br />
          প্ৰতিশৰতৰ প্ৰভাতী ফুলে, ক'ব তোমাকেই মোৰ কথা....
          <br />
          <br />
          <strong>বিদায় জীৱন বৰঠাকুৰ!</strong>
        </p>

        <p className="mt-2 text-white text-sm">
          18/11/2025 — ♾ <br /> #ZubeenGarg
        </p>
      </motion.div>
    </div>
  );
};

export default ZubeenTribute;
