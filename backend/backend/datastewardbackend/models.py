from django.db import models


class SemanticAsset(models.Model):
    name = models.CharField(max_length=1028)
    description = models.TextField()
    provenenace = models.CharField(max_length=1028, blank=True, null=True)


class LiteralModel(models.Model):
    label = models.CharField(max_length=1024)
    description = models.TextField(null=True, blank=True)
    synonyms = models.TextField(null=True, blank=True)

    def add_synonym(self, syn):
        self.synonyms += ";;" + syn

    def get_synonyms(self):
        return self.synonyms.split(";;")


class MeasurementLocation(LiteralModel):
    info = "This describes the WHERE of a measurement"


class MeasurementObject(LiteralModel):
    info = "This describes the WHAT of a measureemnt"


class MeasurementMethod(LiteralModel):
    info = "This describes the HOW of a measurement"


class Measurement(models.Model):
    object_of_measurement = models.ForeignKey(
        MeasurementObject, on_delete=models.CASCADE)
    location_of_measurement = models.ForeignKey(
        MeasurementLocation, on_delete=models.CASCADE, null=True, blank=True)
    method_of_measurement = models.ForeignKey(
        MeasurementMethod, on_delete=models.CASCADE, null=True, blank=True)
