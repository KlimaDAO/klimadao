export default {
  "openapi": "3.0.3",
  "info": {
    "title": "Carbonmark REST API",
    "description": "\nWelcome to the API Reference docs for **version 1.1.0** of the Carbonmark REST API. Use this API to view assets, prices, supply, activity and more.\n## Quick start\n⚠️Be sure to prefix a version number, otherwise your application will be exposed to breaking changes.\n\n~~~ts\nconst res = await fetch(\"https://v1.api.carbonmark.com/api/projects\");\nconst projects = await res.json();\n~~~\n\nFor a developer guides and example implementations, or to learn more about Carbonmark and Digital Carbon Market, view our product knowledge base at <a href=\"https://docs.carbonmark.com\">docs.carbonmark.com</a>.\n## \n",
    "termsOfService": "https://www.carbonmark.com/blog/terms-of-use",
    "contact": {
      "name": "Support",
      "url": "https://share-eu1.hsforms.com/1RWJWvyrHT1C_an4cZOHH3gfhhlr"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/KlimaDAO/klimadao/blob/main/LICENSE"
    },
    "version": "1.1.0"
  },
  "components": {
    "schemas": {
      "Project": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "key": {
            "type": "string"
          },
          "projectID": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "methodology": {
            "type": "string"
          },
          "vintage": {
            "type": "string"
          },
          "projectAddress": {
            "type": "string"
          },
          "registry": {
            "type": "string"
          },
          "country": {
            "type": "string"
          },
          "category": {
            "type": "string"
          },
          "price": {
            "type": "string"
          }
        }
      }
    }
  },
  "paths": {
    "/api/categories": {
      "get": {
        "summary": "Categories",
        "description": "A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.",
        "responses": {
          "2XX": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Successful response",
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                },
                "example": [
                  {
                    "id": "Blue Carbon"
                  },
                  {
                    "id": "Forestry"
                  },
                  {
                    "id": "Other"
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/api/countries": {
      "get": {
        "summary": "Countries",
        "description": "Retrieve an array containing the countries that carbon projects originate from",
        "responses": {
          "2XX": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Successful response",
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                },
                "example": [
                  {
                    "id": "Brazil"
                  },
                  {
                    "id": "Bulgaria"
                  },
                  {
                    "id": "China"
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/api/purchases/{id}": {
      "get": {
        "summary": "Purchase details",
        "description": "Retrieve the details of a purchase by its ID (transaction hash)",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "example": "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8",
            "in": "path",
            "name": "id",
            "required": true,
            "description": "ID (transaction hash) of the purchase to retrieve"
          }
        ],
        "responses": {
          "2XX": {
            "description": "Successful response with listing details",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "ID (transaction hash) of the purchase",
                      "examples": [
                        "0xcad9383fba33aaad6256304ef7b103f3f00b21afbaffbbff14423bf074b699e8"
                      ],
                      "type": "string"
                    },
                    "amount": {
                      "description": "Stringified 18 decimal BigNumber",
                      "examples": [
                        "1000000000000000000"
                      ],
                      "type": "string"
                    },
                    "buyer": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Address of the buyer",
                          "examples": [
                            "0xAAA699f2098ac92c2f4914979fcb22aba86d259"
                          ],
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    "seller": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Address of the seller",
                          "examples": [
                            "0xBBB699f2098ac92c2f4914979fcb22aba86d259"
                          ],
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    "listing": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "ID of the listing that was purchased",
                          "examples": [
                            "0x1"
                          ],
                          "type": "string"
                        },
                        "project": {
                          "type": "object",
                          "properties": {
                            "country": {
                              "examples": [
                                "China"
                              ],
                              "type": "string"
                            },
                            "key": {
                              "examples": [
                                "VCS-191"
                              ],
                              "type": "string"
                            },
                            "methodology": {
                              "examples": [
                                "ACM0002"
                              ],
                              "type": "string"
                            },
                            "name": {
                              "examples": [
                                "4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2"
                              ],
                              "type": "string"
                            },
                            "projectID": {
                              "examples": [
                                "191"
                              ],
                              "type": "string"
                            },
                            "vintage": {
                              "examples": [
                                "2008"
                              ],
                              "type": "string"
                            }
                          },
                          "required": [
                            "country",
                            "key",
                            "methodology",
                            "name",
                            "projectID",
                            "vintage"
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "project"
                      ]
                    },
                    "price": {
                      "description": "Stringified 6 decimal BigNumber",
                      "examples": [
                        "1000000"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "id",
                    "amount",
                    "buyer",
                    "seller",
                    "listing",
                    "price"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/api/vintages": {
      "get": {
        "summary": "Vintages",
        "description": "Retrieve an array of the vintages of available carbon projects",
        "responses": {
          "2XX": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Successful response",
                  "type": "array",
                  "items": {
                    "type": "string",
                    "examples": [
                      [
                        "2006",
                        "2007",
                        "2008",
                        "2009",
                        "2010",
                        "2011",
                        "2012",
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019",
                        "2020"
                      ]
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/projects": {
      "get": {
        "summary": "List projects",
        "tags": [
          "Projects"
        ],
        "description": "Retrieve an array of carbon projects filtered by desired query parameters",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "country",
            "required": false,
            "description": "Desired country of origin for carbon projects"
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "category",
            "required": false,
            "description": "Desired category of carbon projects"
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "search",
            "required": false,
            "description": "Search carbon project names and descriptions for a string of text"
          },
          {
            "schema": {
              "type": "string"
            },
            "in": "query",
            "name": "vintage",
            "required": false,
            "description": "Desired vintage of carbon projects"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "result": {},
                    "status": {
                      "type": "number",
                      "description": "HTTP status code."
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/projects/{id}": {
      "get": {
        "summary": "Project details",
        "tags": [
          "Projects"
        ],
        "description": "Retrieve a carbon project by its project ID",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "example": "VCS-191-2008",
            "in": "path",
            "name": "id",
            "required": true,
            "description": "Project id & vintage"
          }
        ],
        "responses": {
          "2XX": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Successful response",
                  "type": "object",
                  "properties": {
                    "key": {
                      "type": "string"
                    },
                    "projectID": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "registry": {
                      "type": "string"
                    },
                    "country": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "location": {
                      "type": "object",
                      "properties": {
                        "type": {
                          "type": "string"
                        },
                        "geometry": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string"
                            },
                            "coordinates": {
                              "type": "array",
                              "items": {
                                "type": "number"
                              }
                            }
                          }
                        }
                      }
                    },
                    "methodologies": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "category": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "long_description": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    },
                    "stats": {
                      "type": "object",
                      "properties": {
                        "totalBridged": {
                          "type": "number"
                        },
                        "totalRetired": {
                          "type": "number"
                        },
                        "totalSupply": {
                          "type": "number"
                        }
                      }
                    },
                    "prices": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "poolName": {
                            "type": "string"
                          },
                          "supply": {
                            "type": "string"
                          },
                          "poolAddress": {
                            "type": "string"
                          },
                          "isPoolDefault": {
                            "type": "boolean"
                          },
                          "projectTokenAddress": {
                            "type": "string"
                          },
                          "singleUnitPrice": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "isPoolProject": {
                      "type": "boolean"
                    },
                    "vintage": {
                      "type": "string"
                    },
                    "listings": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": true
                      },
                      "nullable": true
                    },
                    "activities": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": true
                      },
                      "nullable": true
                    }
                  }
                },
                "example": {
                  "key": "VCS-191",
                  "projectID": "191",
                  "name": "4×50 MW Dayingjiang- 3 Hydropower Project Phases 1&2",
                  "registry": "VCS",
                  "country": "China",
                  "description": "The Dayingjiang-3 Hydropower Project Phases 1&2 has total installed capacity of 200 MW. ...",
                  "location": {
                    "type": "Feature",
                    "geometry": {
                      "type": "Point",
                      "coordinates": [
                        97.716667,
                        24.470417
                      ]
                    }
                  },
                  "methodologies": [
                    {
                      "id": "ACM0002",
                      "category": "Renewable Energy",
                      "name": "Grid-connected electricity generation from renewable sources"
                    }
                  ],
                  "long_description": "The Dayingjiang-3 Hydropower Project Phases 1&2 is a renewable energy project ...",
                  "url": "https://registry.verra.org/app/projectDetail/VCS/191",
                  "stats": {
                    "totalBridged": 609708,
                    "totalRetired": 223871.6192861833,
                    "totalSupply": 385835.38071381673
                  },
                  "price": "string",
                  "prices": [
                    {
                      "poolName": "bct",
                      "supply": "375274.200673137368160064",
                      "poolAddress": "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
                      "isPoolDefault": true,
                      "projectTokenAddress": "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
                      "singleUnitPrice": "0.699612"
                    }
                  ],
                  "isPoolProject": true,
                  "vintage": "2008"
                }
              }
            }
          }
        }
      }
    },
    "/api/users": {
      "post": {
        "summary": "Create user profile",
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "handle": {
                    "type": "string",
                    "minLength": 3
                  },
                  "username": {
                    "type": "string",
                    "minLength": 2
                  },
                  "description": {
                    "type": "string",
                    "maxLength": 500
                  },
                  "wallet": {
                    "type": "string",
                    "minLength": 26,
                    "maxLength": 64
                  }
                },
                "required": [
                  "handle",
                  "username",
                  "wallet",
                  "description"
                ]
              }
            }
          },
          "required": true
        },
        "responses": {
          "403": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    },
                    "code": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          },
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "handle": {
                      "type": "string"
                    },
                    "username": {
                      "type": "string"
                    },
                    "wallet": {
                      "type": "string"
                    },
                    "updatedAt": {
                      "type": "number"
                    },
                    "createdAt": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/users/{walletOrHandle}": {
      "get": {
        "summary": "User details",
        "tags": [
          "Users"
        ],
        "description": "Get a user's profile and activity",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "example": "wallet",
            "in": "query",
            "name": "type",
            "required": false,
            "description": "When providing an wallet `0x` address instead of a handle, you must attach the `type=wallet` query parameter"
          },
          {
            "schema": {
              "type": "string"
            },
            "examples": {
              "atmosfearful": {
                "value": "atmosfearful"
              },
              "0xAb5B7b5849784279280188b556AF3c179F31Dc5B": {
                "value": "0xAb5B7b5849784279280188b556AF3c179F31Dc5B"
              }
            },
            "in": "path",
            "name": "walletOrHandle",
            "required": true,
            "description": "A user handle or wallet address"
          }
        ],
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "handle": {
                      "type": "string"
                    },
                    "username": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "profileImgUrl": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "updatedAt": {
                      "type": "number"
                    },
                    "createdAt": {
                      "type": "number"
                    },
                    "wallet": {
                      "type": "string"
                    },
                    "listings": {
                      "type": "array"
                    },
                    "activities": {
                      "type": "array"
                    },
                    "assets": {
                      "type": "array"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/users/{wallet}": {
      "put": {
        "summary": "Update user profile",
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "wallet": {
                    "type": "string",
                    "minLength": 3
                  },
                  "handle": {
                    "type": "string",
                    "minLength": 3
                  },
                  "username": {
                    "type": "string",
                    "minLength": 2
                  },
                  "description": {
                    "type": "string",
                    "minLength": 2,
                    "maxLength": 500
                  },
                  "profileImgUrl": {
                    "type": "string",
                    "nullable": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "handle": {
                      "type": "string"
                    },
                    "username": {
                      "type": "string"
                    },
                    "wallet": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "profileImgUrl": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/users/login": {
      "post": {
        "summary": "Get nonce",
        "tags": [
          "Auth"
        ],
        "description": "Provides the user with a nonce to be included in the next signature. Consumed by /verify endpoint.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "wallet": {
                    "type": "string",
                    "minLength": 26,
                    "maxLength": 64
                  }
                },
                "required": [
                  "wallet"
                ]
              }
            }
          },
          "required": true
        },
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nonce": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/users/login/verify": {
      "post": {
        "summary": "Verify signed data",
        "tags": [
          "Auth"
        ],
        "description": "Provide a signed hash to receive a JWT token to be consumed by PUT or POST requests.",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "wallet": {
                    "type": "string",
                    "minLength": 26,
                    "maxLength": 64
                  },
                  "signature": {
                    "type": "string"
                  }
                },
                "required": [
                  "wallet",
                  "signature"
                ]
              }
            }
          },
          "required": true
        },
        "responses": {
          "2XX": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "externalDocs": {
    "url": "https://docs.carbonmark.com/",
    "description": "Additional documentation. The complete product and platform knowledge base for Carbonmark can be found here."
  }
} as const