const { db } = require('./firebase');

const packages = [
  { name: "Comprehensive Full Body Checkup", tests: 85, price: 1499, originalPrice: 2999, category: "Full Body", popular: true, iconString: "Activity" },
  { name: "Advanced Heart Care Package", tests: 42, price: 1999, originalPrice: 3499, category: "Heart", popular: true, iconString: "Heart" },
  { name: "Women's Wellness Premium", tests: 68, price: 2499, originalPrice: 4999, category: "Women", popular: false, iconString: "Award" },
  { name: "Senior Citizen Health Check", tests: 75, price: 1799, originalPrice: 3299, category: "Senior", popular: false, iconString: "Brain" },
  { name: "Diabetes Monitoring Package", tests: 15, price: 899, originalPrice: 1499, category: "Diabetes", popular: false, iconString: "Apple" },
  { name: "Basic Full Body Checkup", tests: 45, price: 999, originalPrice: 1999, category: "Full Body", popular: false, iconString: "Activity" },
];

const tests = [
  { name: "Complete Blood Count (CBC)", price: 299, category: "Blood", turnaround: "6 hrs", fasting: false },
  { name: "Lipid Profile", price: 499, category: "Heart", turnaround: "12 hrs", fasting: true },
  { name: "Thyroid Profile (T3, T4, TSH)", price: 399, category: "Thyroid", turnaround: "12 hrs", fasting: false },
  { name: "HbA1c (Glycosylated Hemoglobin)", price: 349, category: "Diabetes", turnaround: "6 hrs", fasting: false },
  { name: "Vitamin D (25-OH)", price: 799, category: "Vitamins", turnaround: "24 hrs", fasting: false },
  { name: "Liver Function Test (LFT)", price: 599, category: "Liver", turnaround: "12 hrs", fasting: true },
  { name: "Kidney Function Test (KFT)", price: 599, category: "Kidney", turnaround: "12 hrs", fasting: true },
  { name: "Vitamin B12", price: 699, category: "Vitamins", turnaround: "24 hrs", fasting: false },
];

async function seedDatabase() {
  console.log("Starting database seed...");

  try {
    // Seed Packages
    console.log("Seeding packages...");
    const packagesRef = db.collection('packages');
    for (const pkg of packages) {
      await packagesRef.add(pkg);
    }
    console.log(`✅ Seeded ${packages.length} packages`);

    // Seed Tests
    console.log("Seeding individual tests...");
    const testsRef = db.collection('tests');
    for (const test of tests) {
      await testsRef.add(test);
    }
    console.log(`✅ Seeded ${tests.length} tests`);

    console.log("🎉 Database seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
