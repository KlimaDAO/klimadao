export default {
  "openapi": "3.0.3",
  "info": {
    "title": "Carbonmark REST API",
    "description": "\nWelcome to the API Reference docs for **version 2.0.0-0** of the Carbonmark REST API. Use this API to view assets, prices, supply, activity and more.\n## Quick start\n⚠️Be sure to prefix a version number, otherwise your application will be exposed to breaking changes.\n\n~~~ts\nconst res = await fetch(\"https://v1.api.carbonmark.com/projects\");\nconst projects = await res.json();\n~~~\n\nFor a developer guides and example implementations, or to learn more about Carbonmark and Digital Carbon Market, view our product knowledge base at <a href=\"https://docs.carbonmark.com\">docs.carbonmark.com</a>.\n## \n",
    "termsOfService": "https://www.carbonmark.com/blog/terms-of-use",
    "contact": {
      "name": "Support",
      "url": "https://share-eu1.hsforms.com/1RWJWvyrHT1C_an4cZOHH3gfhhlr"
    },
    "license": {
      "name": "MIT",
      "url": "https://github.com/KlimaDAO/klimadao/blob/main/LICENSE"
    },
    "version": "2.0.0-0"
  },
  "components": {
    "schemas": {
      "Project": {
        "type": "object",
        "properties": {
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "short_description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
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
          "methodologies": {
            "type": "array",
            "items": {
              "anyOf": [
                {
                  "type": "object",
                  "properties": {
                    "id": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "category": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "name": {
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
                },
                {
                  "type": "null"
                }
              ]
            }
          },
          "location": {
            "description": "A GeoJSON Point feature.",
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "Feature"
                    ]
                  },
                  "geometry": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "minItems": 2,
                        "maxItems": 2,
                        "type": "array",
                        "items": {
                          "type": "number"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "coordinates"
                    ]
                  }
                },
                "required": [
                  "type",
                  "geometry"
                ]
              },
              {
                "type": "null"
              }
            ]
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
          "updatedAt": {
            "type": "string"
          },
          "country": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              }
            },
            "required": [
              "id"
            ]
          },
          "price": {
            "type": "string"
          },
          "listings": {
            "anyOf": [
              {
                "type": "array",
                "items": {
                  "description": "Marketplace listing with per-tonne price and project info.",
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "Unique listing identifier",
                      "type": "string"
                    },
                    "leftToSell": {
                      "description": "Remaining supply. Unformatted 18 decimal string",
                      "type": "string"
                    },
                    "tokenAddress": {
                      "description": "Address of the asset being sold",
                      "type": "string"
                    },
                    "singleUnitPrice": {
                      "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
                      "type": "string"
                    },
                    "totalAmountToSell": {
                      "type": "string"
                    },
                    "active": {
                      "anyOf": [
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "deleted": {
                      "anyOf": [
                        {
                          "type": "boolean"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "batches": {
                      "anyOf": [
                        {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "batchPrices": {
                      "anyOf": [
                        {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "createdAt": {
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
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "seller": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "handle": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "username": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "description": {
                              "anyOf": [
                                {
                                  "type": "string"
                                },
                                {
                                  "type": "null"
                                }
                              ]
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
                            "id": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "id"
                          ]
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "expiration": {
                      "description": "Unix Timestamp (seconds) when the listing expires.",
                      "type": "string"
                    },
                    "minFillAmount": {
                      "description": "Minimum quantity for purchase transaction to succeed.",
                      "type": "string"
                    },
                    "project": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "key": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "category": {
                              "anyOf": [
                                {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "id"
                                  ]
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "country": {
                              "anyOf": [
                                {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "id"
                                  ]
                                },
                                {
                                  "type": "null"
                                }
                              ]
                            },
                            "methodology": {
                              "type": "string"
                            },
                            "projectAddress": {
                              "type": "string"
                            },
                            "projectID": {
                              "type": "string"
                            },
                            "registry": {
                              "type": "string"
                            },
                            "vintage": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "id",
                            "key",
                            "name",
                            "methodology",
                            "projectAddress",
                            "projectID",
                            "registry",
                            "vintage"
                          ]
                        },
                        {
                          "type": "null"
                        }
                      ]
                    }
                  },
                  "required": [
                    "id",
                    "leftToSell",
                    "tokenAddress",
                    "singleUnitPrice",
                    "totalAmountToSell",
                    "expiration",
                    "minFillAmount"
                  ]
                }
              },
              {
                "type": "null"
              }
            ]
          },
          "images": {
            "anyOf": [
              {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string"
                    },
                    "caption": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "url",
                    "caption"
                  ]
                }
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "key",
          "projectID",
          "name",
          "methodologies",
          "vintage",
          "projectAddress",
          "registry",
          "updatedAt",
          "country",
          "price"
        ]
      },
      "DetailedProject": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string"
          },
          "projectID": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "registry": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "country": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "location": {
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "enum": [
                      "Feature"
                    ]
                  },
                  "geometry": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Point"
                        ]
                      },
                      "coordinates": {
                        "minItems": 2,
                        "maxItems": 2,
                        "type": "array",
                        "items": {
                          "type": "number"
                        }
                      }
                    },
                    "required": [
                      "type",
                      "coordinates"
                    ]
                  }
                },
                "required": [
                  "type",
                  "geometry"
                ]
              },
              {
                "type": "null"
              }
            ]
          },
          "methodologies": {
            "anyOf": [
              {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "category": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "name": {
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
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              {
                "type": "null"
              }
            ]
          },
          "images": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "caption": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "url": {
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
          },
          "long_description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "short_description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
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
            },
            "required": [
              "totalBridged",
              "totalRetired",
              "totalSupply"
            ]
          },
          "prices": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "poolName": {
                  "description": "Lowercase name of pool / pool token e.g. 'bct'",
                  "anyOf": [
                    {
                      "type": "string",
                      "enum": [
                        "ubo"
                      ]
                    },
                    {
                      "type": "string",
                      "enum": [
                        "nbo"
                      ]
                    },
                    {
                      "type": "string",
                      "enum": [
                        "bct"
                      ]
                    },
                    {
                      "type": "string",
                      "enum": [
                        "nct"
                      ]
                    }
                  ]
                },
                "supply": {
                  "description": "Remaining supply in pool",
                  "type": "string"
                },
                "poolAddress": {
                  "description": "Address of the pool itself, e.g. bct token address",
                  "type": "boolean"
                },
                "projectTokenAddress": {
                  "description": "Address of the project token in this pool",
                  "type": "string"
                },
                "isPoolDefault": {
                  "description": "True if default project for pool and no selective redemption fee applies",
                  "type": "boolean"
                },
                "singleUnitPrice": {
                  "description": "formatted USDC price for 1 tonne e.g. '0.123456'",
                  "type": "string"
                }
              },
              "required": [
                "poolName",
                "supply",
                "poolAddress",
                "projectTokenAddress",
                "isPoolDefault",
                "singleUnitPrice"
              ]
            }
          },
          "listings": {
            "type": "array",
            "items": {
              "description": "Marketplace listing with per-tonne price and project info.",
              "type": "object",
              "properties": {
                "id": {
                  "description": "Unique listing identifier",
                  "type": "string"
                },
                "leftToSell": {
                  "description": "Remaining supply. Unformatted 18 decimal string",
                  "type": "string"
                },
                "tokenAddress": {
                  "description": "Address of the asset being sold",
                  "type": "string"
                },
                "singleUnitPrice": {
                  "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
                  "type": "string"
                },
                "totalAmountToSell": {
                  "type": "string"
                },
                "active": {
                  "anyOf": [
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "deleted": {
                  "anyOf": [
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "batches": {
                  "anyOf": [
                    {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "batchPrices": {
                  "anyOf": [
                    {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "createdAt": {
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
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "seller": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "handle": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "username": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "description": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
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
                        "id": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "expiration": {
                  "description": "Unix Timestamp (seconds) when the listing expires.",
                  "type": "string"
                },
                "minFillAmount": {
                  "description": "Minimum quantity for purchase transaction to succeed.",
                  "type": "string"
                },
                "project": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "key": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "category": {
                          "anyOf": [
                            {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "id"
                              ]
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "country": {
                          "anyOf": [
                            {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "id"
                              ]
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "methodology": {
                          "type": "string"
                        },
                        "projectAddress": {
                          "type": "string"
                        },
                        "projectID": {
                          "type": "string"
                        },
                        "registry": {
                          "type": "string"
                        },
                        "vintage": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "id",
                        "key",
                        "name",
                        "methodology",
                        "projectAddress",
                        "projectID",
                        "registry",
                        "vintage"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              "required": [
                "id",
                "leftToSell",
                "tokenAddress",
                "singleUnitPrice",
                "totalAmountToSell",
                "expiration",
                "minFillAmount"
              ]
            }
          },
          "activities": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "amount": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "previousAmount": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "price": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "previousPrice": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "timeStamp": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "activityType": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "seller": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "handle": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "buyer": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "handle": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              "required": [
                "id"
              ]
            }
          },
          "price": {
            "type": "string"
          },
          "vintage": {
            "type": "string"
          }
        },
        "required": [
          "key",
          "images",
          "stats",
          "prices",
          "listings",
          "activities",
          "price",
          "vintage"
        ]
      },
      "Activity": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "amount": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "previousAmount": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "price": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "previousPrice": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "timeStamp": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "activityType": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "seller": {
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "handle": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  }
                },
                "required": [
                  "id"
                ]
              },
              {
                "type": "null"
              }
            ]
          },
          "buyer": {
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "handle": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  }
                },
                "required": [
                  "id"
                ]
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "id"
        ]
      },
      "Category": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          }
        },
        "required": [
          "id"
        ]
      },
      "Country": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          }
        },
        "required": [
          "id"
        ]
      },
      "Listing": {
        "description": "Marketplace listing with per-tonne price and project info.",
        "type": "object",
        "properties": {
          "id": {
            "description": "Unique listing identifier",
            "type": "string"
          },
          "leftToSell": {
            "description": "Remaining supply. Unformatted 18 decimal string",
            "type": "string"
          },
          "tokenAddress": {
            "description": "Address of the asset being sold",
            "type": "string"
          },
          "singleUnitPrice": {
            "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
            "type": "string"
          },
          "totalAmountToSell": {
            "type": "string"
          },
          "active": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ]
          },
          "deleted": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ]
          },
          "batches": {
            "anyOf": [
              {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              {
                "type": "null"
              }
            ]
          },
          "batchPrices": {
            "anyOf": [
              {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              {
                "type": "null"
              }
            ]
          },
          "createdAt": {
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
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "seller": {
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "handle": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "username": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "description": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
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
                  "id": {
                    "type": "string"
                  }
                },
                "required": [
                  "id"
                ]
              },
              {
                "type": "null"
              }
            ]
          },
          "expiration": {
            "description": "Unix Timestamp (seconds) when the listing expires.",
            "type": "string"
          },
          "minFillAmount": {
            "description": "Minimum quantity for purchase transaction to succeed.",
            "type": "string"
          },
          "project": {
            "anyOf": [
              {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "key": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "category": {
                    "anyOf": [
                      {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id"
                        ]
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "country": {
                    "anyOf": [
                      {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id"
                        ]
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "methodology": {
                    "type": "string"
                  },
                  "projectAddress": {
                    "type": "string"
                  },
                  "projectID": {
                    "type": "string"
                  },
                  "registry": {
                    "type": "string"
                  },
                  "vintage": {
                    "type": "string"
                  }
                },
                "required": [
                  "id",
                  "key",
                  "name",
                  "methodology",
                  "projectAddress",
                  "projectID",
                  "registry",
                  "vintage"
                ]
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "required": [
          "id",
          "leftToSell",
          "tokenAddress",
          "singleUnitPrice",
          "totalAmountToSell",
          "expiration",
          "minFillAmount"
        ]
      },
      "Methodology": {
        "type": "object",
        "properties": {
          "id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "category": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "name": {
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
      },
      "NetworkParam": {
        "examples": [
          "polygon",
          "mumbai"
        ],
        "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet).",
        "default": "polygon",
        "anyOf": [
          {
            "type": "string",
            "enum": [
              "polygon"
            ]
          },
          {
            "type": "string",
            "enum": [
              "mumbai"
            ]
          }
        ]
      },
      "Purchase": {
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
          "listing",
          "price"
        ]
      },
      "User": {
        "type": "object",
        "properties": {
          "handle": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "username": {
            "type": "string"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
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
            "type": "array",
            "items": {
              "description": "Marketplace listing with per-tonne price and project info.",
              "type": "object",
              "properties": {
                "id": {
                  "description": "Unique listing identifier",
                  "type": "string"
                },
                "leftToSell": {
                  "description": "Remaining supply. Unformatted 18 decimal string",
                  "type": "string"
                },
                "tokenAddress": {
                  "description": "Address of the asset being sold",
                  "type": "string"
                },
                "singleUnitPrice": {
                  "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
                  "type": "string"
                },
                "totalAmountToSell": {
                  "type": "string"
                },
                "active": {
                  "anyOf": [
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "deleted": {
                  "anyOf": [
                    {
                      "type": "boolean"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "batches": {
                  "anyOf": [
                    {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "batchPrices": {
                  "anyOf": [
                    {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "createdAt": {
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
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "seller": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "handle": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "username": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "description": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
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
                        "id": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "expiration": {
                  "description": "Unix Timestamp (seconds) when the listing expires.",
                  "type": "string"
                },
                "minFillAmount": {
                  "description": "Minimum quantity for purchase transaction to succeed.",
                  "type": "string"
                },
                "project": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "key": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "category": {
                          "anyOf": [
                            {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "id"
                              ]
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "country": {
                          "anyOf": [
                            {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "id"
                              ]
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "methodology": {
                          "type": "string"
                        },
                        "projectAddress": {
                          "type": "string"
                        },
                        "projectID": {
                          "type": "string"
                        },
                        "registry": {
                          "type": "string"
                        },
                        "vintage": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "id",
                        "key",
                        "name",
                        "methodology",
                        "projectAddress",
                        "projectID",
                        "registry",
                        "vintage"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              "required": [
                "id",
                "leftToSell",
                "tokenAddress",
                "singleUnitPrice",
                "totalAmountToSell",
                "expiration",
                "minFillAmount"
              ]
            }
          },
          "activities": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "amount": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "previousAmount": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "price": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "previousPrice": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "timeStamp": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "activityType": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "seller": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "handle": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                },
                "buyer": {
                  "anyOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "handle": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "required": [
                        "id"
                      ]
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              "required": [
                "id"
              ]
            }
          },
          "assets": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "token": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "symbol": {
                      "type": "string"
                    },
                    "decimals": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "id",
                    "name",
                    "symbol",
                    "decimals"
                  ]
                },
                "amount": {
                  "type": "string"
                }
              },
              "required": [
                "id",
                "token",
                "amount"
              ]
            }
          }
        },
        "required": [
          "username",
          "updatedAt",
          "createdAt",
          "wallet",
          "listings",
          "activities",
          "assets"
        ]
      },
      "Asset": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "token": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "name": {
                "type": "string"
              },
              "symbol": {
                "type": "string"
              },
              "decimals": {
                "type": "number"
              }
            },
            "required": [
              "id",
              "name",
              "symbol",
              "decimals"
            ]
          },
          "amount": {
            "type": "string"
          }
        },
        "required": [
          "id",
          "token",
          "amount"
        ]
      },
      "TokenPrice": {
        "type": "object",
        "properties": {
          "poolName": {
            "description": "Lowercase name of pool / pool token e.g. 'bct'",
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "ubo"
                ]
              },
              {
                "type": "string",
                "enum": [
                  "nbo"
                ]
              },
              {
                "type": "string",
                "enum": [
                  "bct"
                ]
              },
              {
                "type": "string",
                "enum": [
                  "nct"
                ]
              }
            ]
          },
          "supply": {
            "description": "Remaining supply in pool",
            "type": "string"
          },
          "poolAddress": {
            "description": "Address of the pool itself, e.g. bct token address",
            "type": "boolean"
          },
          "projectTokenAddress": {
            "description": "Address of the project token in this pool",
            "type": "string"
          },
          "isPoolDefault": {
            "description": "True if default project for pool and no selective redemption fee applies",
            "type": "boolean"
          },
          "singleUnitPrice": {
            "description": "formatted USDC price for 1 tonne e.g. '0.123456'",
            "type": "string"
          }
        },
        "required": [
          "poolName",
          "supply",
          "poolAddress",
          "projectTokenAddress",
          "isPoolDefault",
          "singleUnitPrice"
        ]
      },
      "Image": {
        "type": "object",
        "properties": {
          "caption": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ]
          },
          "url": {
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
      },
      "def-0": {
        "type": "object",
        "properties": {
          "network": {
            "examples": [
              "polygon",
              "mumbai"
            ],
            "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet).",
            "default": "polygon",
            "anyOf": [
              {
                "type": "string",
                "enum": [
                  "polygon"
                ]
              },
              {
                "type": "string",
                "enum": [
                  "mumbai"
                ]
              }
            ],
            "title": "http://api.carbonmark.com/schemas/querystring/network"
          }
        },
        "required": [
          "network"
        ],
        "title": "http://api.carbonmark.com/schemas"
      },
      "def-1": {
        "examples": [
          "polygon",
          "mumbai"
        ],
        "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet).",
        "default": "polygon",
        "anyOf": [
          {
            "type": "string",
            "enum": [
              "polygon"
            ]
          },
          {
            "type": "string",
            "enum": [
              "mumbai"
            ]
          }
        ],
        "title": "http://api.carbonmark.com/schemas/querystring/network"
      }
    }
  },
  "paths": {
    "/categories": {
      "get": {
        "summary": "Categories",
        "description": "A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "id"
                    ]
                  }
                },
                "examples": [
                  [
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
                ]
              }
            }
          }
        }
      }
    },
    "/countries": {
      "get": {
        "summary": "Countries",
        "description": "Retrieve an array containing the countries that carbon projects originate from",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "id"
                    ]
                  }
                },
                "examples": [
                  [
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
                ]
              }
            }
          }
        }
      }
    },
    "/projects": {
      "get": {
        "summary": "List projects",
        "tags": [
          "Projects"
        ],
        "description": "Retrieve an array of carbon projects filtered by desired query parameters",
        "parameters": [
          {
            "schema": {
              "default": "polygon",
              "anyOf": [
                {
                  "type": "string",
                  "enum": [
                    "polygon"
                  ]
                },
                {
                  "type": "string",
                  "enum": [
                    "mumbai"
                  ]
                }
              ]
            },
            "examples": {
              "polygon": {
                "value": "polygon"
              },
              "mumbai": {
                "value": "mumbai"
              }
            },
            "in": "query",
            "name": "network",
            "required": false,
            "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet)."
          },
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
          },
          {
            "schema": {
              "default": "1695861140",
              "type": "string"
            },
            "example": "1620000000",
            "in": "query",
            "name": "expiresAfter",
            "required": false,
            "description": "Only return projects listings that expire after this timestamp (Unix seconds)"
          }
        ],
        "responses": {
          "200": {
            "description": "List of projects",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "description": {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "short_description": {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
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
                      "methodologies": {
                        "type": "array",
                        "items": {
                          "anyOf": [
                            {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "anyOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "category": {
                                  "anyOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "name": {
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
                            },
                            {
                              "type": "null"
                            }
                          ]
                        }
                      },
                      "location": {
                        "description": "A GeoJSON Point feature.",
                        "anyOf": [
                          {
                            "type": "object",
                            "properties": {
                              "type": {
                                "type": "string",
                                "enum": [
                                  "Feature"
                                ]
                              },
                              "geometry": {
                                "type": "object",
                                "properties": {
                                  "type": {
                                    "type": "string",
                                    "enum": [
                                      "Point"
                                    ]
                                  },
                                  "coordinates": {
                                    "minItems": 2,
                                    "maxItems": 2,
                                    "type": "array",
                                    "items": {
                                      "type": "number"
                                    }
                                  }
                                },
                                "required": [
                                  "type",
                                  "coordinates"
                                ]
                              }
                            },
                            "required": [
                              "type",
                              "geometry"
                            ]
                          },
                          {
                            "type": "null"
                          }
                        ]
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
                      "updatedAt": {
                        "type": "string"
                      },
                      "country": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id"
                        ]
                      },
                      "price": {
                        "type": "string"
                      },
                      "listings": {
                        "anyOf": [
                          {
                            "type": "array",
                            "items": {
                              "description": "Marketplace listing with per-tonne price and project info.",
                              "type": "object",
                              "properties": {
                                "id": {
                                  "description": "Unique listing identifier",
                                  "type": "string"
                                },
                                "leftToSell": {
                                  "description": "Remaining supply. Unformatted 18 decimal string",
                                  "type": "string"
                                },
                                "tokenAddress": {
                                  "description": "Address of the asset being sold",
                                  "type": "string"
                                },
                                "singleUnitPrice": {
                                  "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
                                  "type": "string"
                                },
                                "totalAmountToSell": {
                                  "type": "string"
                                },
                                "active": {
                                  "anyOf": [
                                    {
                                      "type": "boolean"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "deleted": {
                                  "anyOf": [
                                    {
                                      "type": "boolean"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "batches": {
                                  "anyOf": [
                                    {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "batchPrices": {
                                  "anyOf": [
                                    {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      }
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "createdAt": {
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
                                  "anyOf": [
                                    {
                                      "type": "string"
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "seller": {
                                  "anyOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "handle": {
                                          "anyOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "username": {
                                          "anyOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "description": {
                                          "anyOf": [
                                            {
                                              "type": "string"
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
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
                                        "id": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "id"
                                      ]
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                },
                                "expiration": {
                                  "description": "Unix Timestamp (seconds) when the listing expires.",
                                  "type": "string"
                                },
                                "minFillAmount": {
                                  "description": "Minimum quantity for purchase transaction to succeed.",
                                  "type": "string"
                                },
                                "project": {
                                  "anyOf": [
                                    {
                                      "type": "object",
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "key": {
                                          "type": "string"
                                        },
                                        "name": {
                                          "type": "string"
                                        },
                                        "category": {
                                          "anyOf": [
                                            {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": [
                                                "id"
                                              ]
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "country": {
                                          "anyOf": [
                                            {
                                              "type": "object",
                                              "properties": {
                                                "id": {
                                                  "type": "string"
                                                }
                                              },
                                              "required": [
                                                "id"
                                              ]
                                            },
                                            {
                                              "type": "null"
                                            }
                                          ]
                                        },
                                        "methodology": {
                                          "type": "string"
                                        },
                                        "projectAddress": {
                                          "type": "string"
                                        },
                                        "projectID": {
                                          "type": "string"
                                        },
                                        "registry": {
                                          "type": "string"
                                        },
                                        "vintage": {
                                          "type": "string"
                                        }
                                      },
                                      "required": [
                                        "id",
                                        "key",
                                        "name",
                                        "methodology",
                                        "projectAddress",
                                        "projectID",
                                        "registry",
                                        "vintage"
                                      ]
                                    },
                                    {
                                      "type": "null"
                                    }
                                  ]
                                }
                              },
                              "required": [
                                "id",
                                "leftToSell",
                                "tokenAddress",
                                "singleUnitPrice",
                                "totalAmountToSell",
                                "expiration",
                                "minFillAmount"
                              ]
                            }
                          },
                          {
                            "type": "null"
                          }
                        ]
                      },
                      "images": {
                        "anyOf": [
                          {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "url": {
                                  "type": "string"
                                },
                                "caption": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "url",
                                "caption"
                              ]
                            }
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    },
                    "required": [
                      "key",
                      "projectID",
                      "name",
                      "methodologies",
                      "vintage",
                      "projectAddress",
                      "registry",
                      "updatedAt",
                      "country",
                      "price"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/{walletOrHandle}": {
      "get": {
        "summary": "User details",
        "tags": [
          "Users"
        ],
        "description": "Get a user's profile and activity",
        "parameters": [
          {
            "schema": {
              "default": "polygon",
              "anyOf": [
                {
                  "type": "string",
                  "enum": [
                    "polygon"
                  ]
                },
                {
                  "type": "string",
                  "enum": [
                    "mumbai"
                  ]
                }
              ]
            },
            "examples": {
              "polygon": {
                "value": "polygon"
              },
              "mumbai": {
                "value": "mumbai"
              }
            },
            "in": "query",
            "name": "network",
            "required": false,
            "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet)."
          },
          {
            "schema": {
              "default": "1695861140",
              "type": "string"
            },
            "example": "1620000000",
            "in": "query",
            "name": "expiresAfter",
            "required": false,
            "description": "Only return listings that expire after this timestamp (Unix seconds)"
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
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "handle": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "username": {
                      "type": "string"
                    },
                    "description": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
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
                      "type": "array",
                      "items": {
                        "description": "Marketplace listing with per-tonne price and project info.",
                        "type": "object",
                        "properties": {
                          "id": {
                            "description": "Unique listing identifier",
                            "type": "string"
                          },
                          "leftToSell": {
                            "description": "Remaining supply. Unformatted 18 decimal string",
                            "type": "string"
                          },
                          "tokenAddress": {
                            "description": "Address of the asset being sold",
                            "type": "string"
                          },
                          "singleUnitPrice": {
                            "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
                            "type": "string"
                          },
                          "totalAmountToSell": {
                            "type": "string"
                          },
                          "active": {
                            "anyOf": [
                              {
                                "type": "boolean"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "deleted": {
                            "anyOf": [
                              {
                                "type": "boolean"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "batches": {
                            "anyOf": [
                              {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "batchPrices": {
                            "anyOf": [
                              {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "createdAt": {
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
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "seller": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "handle": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "username": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "description": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
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
                                  "id": {
                                    "type": "string"
                                  }
                                },
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "expiration": {
                            "description": "Unix Timestamp (seconds) when the listing expires.",
                            "type": "string"
                          },
                          "minFillAmount": {
                            "description": "Minimum quantity for purchase transaction to succeed.",
                            "type": "string"
                          },
                          "project": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "key": {
                                    "type": "string"
                                  },
                                  "name": {
                                    "type": "string"
                                  },
                                  "category": {
                                    "anyOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "id"
                                        ]
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "country": {
                                    "anyOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "id"
                                        ]
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "methodology": {
                                    "type": "string"
                                  },
                                  "projectAddress": {
                                    "type": "string"
                                  },
                                  "projectID": {
                                    "type": "string"
                                  },
                                  "registry": {
                                    "type": "string"
                                  },
                                  "vintage": {
                                    "type": "string"
                                  }
                                },
                                "required": [
                                  "id",
                                  "key",
                                  "name",
                                  "methodology",
                                  "projectAddress",
                                  "projectID",
                                  "registry",
                                  "vintage"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "id",
                          "leftToSell",
                          "tokenAddress",
                          "singleUnitPrice",
                          "totalAmountToSell",
                          "expiration",
                          "minFillAmount"
                        ]
                      }
                    },
                    "activities": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "amount": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "previousAmount": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "price": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "previousPrice": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "timeStamp": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "activityType": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "seller": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "handle": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "buyer": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "handle": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "id"
                        ]
                      }
                    },
                    "assets": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "token": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "name": {
                                "type": "string"
                              },
                              "symbol": {
                                "type": "string"
                              },
                              "decimals": {
                                "type": "number"
                              }
                            },
                            "required": [
                              "id",
                              "name",
                              "symbol",
                              "decimals"
                            ]
                          },
                          "amount": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "id",
                          "token",
                          "amount"
                        ]
                      }
                    }
                  },
                  "required": [
                    "username",
                    "updatedAt",
                    "createdAt",
                    "wallet",
                    "listings",
                    "activities",
                    "assets"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/users": {
      "post": {
        "summary": "Create user profile",
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "required": [
                  "handle",
                  "username",
                  "wallet"
                ],
                "type": "object",
                "properties": {
                  "handle": {
                    "minLength": 3,
                    "maxLength": 24,
                    "type": "string"
                  },
                  "username": {
                    "minLength": 2,
                    "type": "string"
                  },
                  "wallet": {
                    "minLength": 26,
                    "maxLength": 64,
                    "type": "string"
                  },
                  "description": {
                    "anyOf": [
                      {
                        "maxLength": 500,
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
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
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "required": [
                    "handle",
                    "username",
                    "wallet"
                  ],
                  "type": "object",
                  "properties": {
                    "handle": {
                      "minLength": 3,
                      "maxLength": 24,
                      "type": "string"
                    },
                    "username": {
                      "minLength": 2,
                      "type": "string"
                    },
                    "wallet": {
                      "minLength": 26,
                      "maxLength": 64,
                      "type": "string"
                    },
                    "description": {
                      "anyOf": [
                        {
                          "maxLength": 500,
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
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
          },
          "403": {
            "description": "Default Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "error"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/users/{wallet}": {
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
                    "minLength": 3,
                    "type": "string"
                  },
                  "username": {
                    "minLength": 2,
                    "type": "string"
                  },
                  "description": {
                    "minLength": 2,
                    "maxLength": 500,
                    "type": "string"
                  },
                  "profileImgUrl": {
                    "type": "string"
                  }
                },
                "required": [
                  "wallet",
                  "username",
                  "description"
                ]
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "wallet": {
                      "minLength": 3,
                      "type": "string"
                    },
                    "username": {
                      "minLength": 2,
                      "type": "string"
                    },
                    "description": {
                      "minLength": 2,
                      "maxLength": 500,
                      "type": "string"
                    },
                    "profileImgUrl": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "wallet",
                    "username",
                    "description"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/vintages": {
      "get": {
        "summary": "Vintages",
        "description": "Retrieve an array of the vintages of available carbon projects",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
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
    },
    "/projects/{id}": {
      "get": {
        "summary": "Project details",
        "tags": [
          "Projects"
        ],
        "description": "Retrieve a carbon project by its project ID",
        "parameters": [
          {
            "schema": {
              "default": "Current system timestamp.",
              "type": "string"
            },
            "example": "1620000000",
            "in": "query",
            "name": "expiresAfter",
            "required": false,
            "description": "Only return projects listings that expire after this timestamp (Unix seconds)"
          },
          {
            "schema": {
              "default": "polygon",
              "anyOf": [
                {
                  "type": "string",
                  "enum": [
                    "polygon"
                  ]
                },
                {
                  "type": "string",
                  "enum": [
                    "mumbai"
                  ]
                }
              ]
            },
            "examples": {
              "polygon": {
                "value": "polygon"
              },
              "mumbai": {
                "value": "mumbai"
              }
            },
            "in": "query",
            "name": "network",
            "required": false,
            "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet)."
          },
          {
            "schema": {
              "type": "string",
              "pattern": "^(VCS|PURO|ICR)-\\d+-(19\\d{2}|20\\d{2})$"
            },
            "example": "VCS-191-2008",
            "in": "path",
            "name": "id",
            "required": true,
            "description": "Project id & vintage"
          }
        ],
        "responses": {
          "200": {
            "description": "Project with id",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "key": {
                      "type": "string"
                    },
                    "projectID": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "name": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "registry": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "country": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "description": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "location": {
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "enum": [
                                "Feature"
                              ]
                            },
                            "geometry": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "enum": [
                                    "Point"
                                  ]
                                },
                                "coordinates": {
                                  "minItems": 2,
                                  "maxItems": 2,
                                  "type": "array",
                                  "items": {
                                    "type": "number"
                                  }
                                }
                              },
                              "required": [
                                "type",
                                "coordinates"
                              ]
                            }
                          },
                          "required": [
                            "type",
                            "geometry"
                          ]
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "methodologies": {
                      "anyOf": [
                        {
                          "type": "array",
                          "items": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "category": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "name": {
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
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "images": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "caption": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "url": {
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
                    },
                    "long_description": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "short_description": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "url": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
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
                      },
                      "required": [
                        "totalBridged",
                        "totalRetired",
                        "totalSupply"
                      ]
                    },
                    "prices": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "poolName": {
                            "description": "Lowercase name of pool / pool token e.g. 'bct'",
                            "anyOf": [
                              {
                                "type": "string",
                                "enum": [
                                  "ubo"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "nbo"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "bct"
                                ]
                              },
                              {
                                "type": "string",
                                "enum": [
                                  "nct"
                                ]
                              }
                            ]
                          },
                          "supply": {
                            "description": "Remaining supply in pool",
                            "type": "string"
                          },
                          "poolAddress": {
                            "description": "Address of the pool itself, e.g. bct token address",
                            "type": "boolean"
                          },
                          "projectTokenAddress": {
                            "description": "Address of the project token in this pool",
                            "type": "string"
                          },
                          "isPoolDefault": {
                            "description": "True if default project for pool and no selective redemption fee applies",
                            "type": "boolean"
                          },
                          "singleUnitPrice": {
                            "description": "formatted USDC price for 1 tonne e.g. '0.123456'",
                            "type": "string"
                          }
                        },
                        "required": [
                          "poolName",
                          "supply",
                          "poolAddress",
                          "projectTokenAddress",
                          "isPoolDefault",
                          "singleUnitPrice"
                        ]
                      }
                    },
                    "listings": {
                      "type": "array",
                      "items": {
                        "description": "Marketplace listing with per-tonne price and project info.",
                        "type": "object",
                        "properties": {
                          "id": {
                            "description": "Unique listing identifier",
                            "type": "string"
                          },
                          "leftToSell": {
                            "description": "Remaining supply. Unformatted 18 decimal string",
                            "type": "string"
                          },
                          "tokenAddress": {
                            "description": "Address of the asset being sold",
                            "type": "string"
                          },
                          "singleUnitPrice": {
                            "description": "USDC price per tonne. Unformatted 6 decimal string. e.g. 1000000",
                            "type": "string"
                          },
                          "totalAmountToSell": {
                            "type": "string"
                          },
                          "active": {
                            "anyOf": [
                              {
                                "type": "boolean"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "deleted": {
                            "anyOf": [
                              {
                                "type": "boolean"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "batches": {
                            "anyOf": [
                              {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "batchPrices": {
                            "anyOf": [
                              {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "createdAt": {
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
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "seller": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "handle": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "username": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "description": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
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
                                  "id": {
                                    "type": "string"
                                  }
                                },
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "expiration": {
                            "description": "Unix Timestamp (seconds) when the listing expires.",
                            "type": "string"
                          },
                          "minFillAmount": {
                            "description": "Minimum quantity for purchase transaction to succeed.",
                            "type": "string"
                          },
                          "project": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "key": {
                                    "type": "string"
                                  },
                                  "name": {
                                    "type": "string"
                                  },
                                  "category": {
                                    "anyOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "id"
                                        ]
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "country": {
                                    "anyOf": [
                                      {
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string"
                                          }
                                        },
                                        "required": [
                                          "id"
                                        ]
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  },
                                  "methodology": {
                                    "type": "string"
                                  },
                                  "projectAddress": {
                                    "type": "string"
                                  },
                                  "projectID": {
                                    "type": "string"
                                  },
                                  "registry": {
                                    "type": "string"
                                  },
                                  "vintage": {
                                    "type": "string"
                                  }
                                },
                                "required": [
                                  "id",
                                  "key",
                                  "name",
                                  "methodology",
                                  "projectAddress",
                                  "projectID",
                                  "registry",
                                  "vintage"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "id",
                          "leftToSell",
                          "tokenAddress",
                          "singleUnitPrice",
                          "totalAmountToSell",
                          "expiration",
                          "minFillAmount"
                        ]
                      }
                    },
                    "activities": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "amount": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "previousAmount": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "price": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "previousPrice": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "timeStamp": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "activityType": {
                            "anyOf": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "seller": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "handle": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          },
                          "buyer": {
                            "anyOf": [
                              {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "handle": {
                                    "anyOf": [
                                      {
                                        "type": "string"
                                      },
                                      {
                                        "type": "null"
                                      }
                                    ]
                                  }
                                },
                                "required": [
                                  "id"
                                ]
                              },
                              {
                                "type": "null"
                              }
                            ]
                          }
                        },
                        "required": [
                          "id"
                        ]
                      }
                    },
                    "price": {
                      "type": "string"
                    },
                    "vintage": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "key",
                    "images",
                    "stats",
                    "prices",
                    "listings",
                    "activities",
                    "price",
                    "vintage"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/purchases/{id}": {
      "get": {
        "summary": "Purchase details",
        "description": "Retrieve the details of a purchase by its ID (transaction hash)",
        "parameters": [
          {
            "schema": {
              "default": "polygon",
              "anyOf": [
                {
                  "type": "string",
                  "enum": [
                    "polygon"
                  ]
                },
                {
                  "type": "string",
                  "enum": [
                    "mumbai"
                  ]
                }
              ]
            },
            "examples": {
              "polygon": {
                "value": "polygon"
              },
              "mumbai": {
                "value": "mumbai"
              }
            },
            "in": "query",
            "name": "network",
            "required": false,
            "description": "Optional. Desired blockchain network. Default is `polygon` (mainnet)."
          },
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
          "200": {
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
    "/users/login": {
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
                "required": [
                  "wallet"
                ],
                "type": "object",
                "properties": {
                  "wallet": {
                    "minLength": 26,
                    "maxLength": 64,
                    "type": "string"
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nonce": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "nonce"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/users/login/verify": {
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
                "required": [
                  "wallet",
                  "signature"
                ],
                "type": "object",
                "properties": {
                  "wallet": {
                    "minLength": 26,
                    "maxLength": 64,
                    "type": "string"
                  },
                  "signature": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "token"
                  ]
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