const fs =
  require("fs");

/**
 * Extracts structured
 * manufacturing operational
 * data using Gemini 2.5 Flash
 */

const geminiService =
  async (imagePath) => {

    try {

      // Read image as base64
      const imageData =
        fs.readFileSync(
          imagePath,
          {
            encoding: "base64",
          }
        );

      // Gemini API URL
      const url =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

      // API Call
      const response =
        await fetch(url, {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body: JSON.stringify({

            contents: [

              {

                parts: [

                  {

                    text:
`
Extract all rows from this manufacturing machine shop table.

Preserve all table columns exactly.

Return ONLY valid JSON array.

Fields:
- serialNumber
- date
- shift
- employeeNumber
- operationCode
- machineNumber
- workOrderNumber
- quantityProduced
- timeTakenHours
`,

                  },

                  {

                    inlineData: {

                      mimeType:
                        "image/jpeg",

                      data:
                        imageData,

                    },

                  },

                ],

              },

            ],

            generationConfig: {

              responseMimeType:
                "application/json",

              responseSchema: {

                type: "ARRAY",

                description:
                  "List of manufacturing operational records extracted from the document image.",

                items: {

                  type: "OBJECT",

                  properties: {

                    serialNumber: {

                      type:
                        "STRING",

                    },

                    date: {

                      type:
                        "STRING",

                    },

                    shift: {

                      type:
                        "STRING",

                    },

                    employeeNumber: {

                      type:
                        "STRING",

                    },

                    operationCode: {

                      type:
                        "STRING",

                    },

                    machineNumber: {

                      type:
                        "STRING",

                    },

                    workOrderNumber: {

                      type:
                        "STRING",

                    },

                    quantityProduced: {

                      type:
                        "STRING",

                    },

                    timeTakenHours: {

                      type:
                        "STRING",

                    },

                  },

                  required: [

                    "serialNumber",

                    "date",

                    "shift",

                    "employeeNumber",

                    "operationCode",

                    "machineNumber",

                    "workOrderNumber",

                    "quantityProduced",

                    "timeTakenHours",

                  ],

                },

              },

            },

          }),

        });

      // Handle API errors
      if (!response.ok) {

        const errorData =
          await response.json();

        throw new Error(

          `Gemini API Error: ${JSON.stringify(errorData)}`

        );

      }

      // Parse response
      const data =
        await response.json();


      // Ensure valid candidates
      if (
        !data.candidates ||
        data.candidates.length === 0
      ) {

        throw new Error(

          "No candidates returned from Gemini API."

        );

      }

      // Extract JSON text
      const rawJsonText =
        data.candidates[0]
          .content.parts[0]
          .text;

      // Parse JSON safely
      return JSON.parse(
        rawJsonText
      );

    } catch (error) {

      console.error(
        "Gemini Extraction Error:",
        error
      );

      throw error;

    }

};

module.exports =
  geminiService;